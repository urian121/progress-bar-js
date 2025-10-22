import "./progressLoader.css";
import { ProgressLoaderOptions } from "../interfaces/index";

/**
 * API simplificada para controlar la barra de progreso
 * Inspirada en react-top-loading-bar para máxima facilidad de uso
 */

const defaultOptions: ProgressLoaderOptions = {
  backgroundColor: "#ccc",
  barColor: "#f11946",
};

// Variables de estado globales
let stylesInjected = false;
let currentProgressLoader: HTMLDivElement | null = null;
let currentBar: HTMLDivElement | null = null;
let currentConfig: ProgressLoaderOptions = { ...defaultOptions };

// Inyección de estilos optimizada
const injectStyles = (): void => {
  if (stylesInjected || typeof document === 'undefined') return;

  const existingStyle = document.querySelector('style[data-progress-loader-style]');
  if (existingStyle) {
    stylesInjected = true;
    return;
  }

  const style = document.createElement('style');
  style.setAttribute('data-progress-loader-style', 'true');
  style.textContent = `
    .content-progress-loader {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 10000;
      margin: 0;
      background-color: #ccc;
      height: 3px;
      width: 100%;
    }

    .progress-loader {
      width: 0%;
      height: 100%;
      background-color: #c00;
      transition: width 0.3s ease-out;
    }

    .hidden-content-progress-loader {
      visibility: hidden;
      opacity: 0;
      transition: visibility 0s 1.5s, opacity 1.5s ease-in-out;
    }
  `;
  document.head.appendChild(style);
  stylesInjected = true;
};

// Crear la barra de progreso
const createProgressBar = (options: ProgressLoaderOptions = {}): void => {
  injectStyles();

  // Remover barra existente si hay una
  if (currentProgressLoader) {
    currentProgressLoader.remove();
  }

  currentConfig = { ...defaultOptions, ...options };

  // Crear contenedor
  currentProgressLoader = document.createElement("div");
  currentProgressLoader.className = "content-progress-loader";
  currentProgressLoader.style.backgroundColor = currentConfig.backgroundColor!;

  // Crear barra
  currentBar = document.createElement("div");
  currentBar.className = "progress-loader";
  currentBar.style.backgroundColor = currentConfig.barColor!;
  currentBar.style.width = "0%"; // Iniciar en 0%

  currentProgressLoader.appendChild(currentBar);
  document.body.appendChild(currentProgressLoader);
};

// API pública simplificada - Solo 3 funciones esenciales
/**
 * Inicia la barra de progreso automática basada en carga de página
 * @param options - Configuración opcional
 */
export const start = (options: ProgressLoaderOptions = {}) => {
  createProgressBar(options);

  // Progreso automático basado en eventos de carga de página
  if (currentBar) {
    let progress = 0;
    const startTime = Date.now();

    // Función para actualizar progreso basado en tiempo transcurrido
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;

      // Progreso basado en tiempo - llega al 100% automáticamente
      if (elapsed < 200) {
        progress = Math.min(30, elapsed / 7); // Primeros 200ms: hasta 30%
      } else if (elapsed < 800) {
        progress = 30 + Math.min(40, (elapsed - 200) / 15); // Hasta 800ms: 30-70%
      } else if (elapsed < 2000) {
        progress = 70 + Math.min(25, (elapsed - 800) / 48); // Hasta 2s: 70-95%
      } else {
        progress = 95 + Math.min(5, (elapsed - 2000) / 100); // Después: 95-100%
      }

      // Añadir variación aleatoria para simular carga real
      progress += Math.random() * 1 - 0.5; // ±0.5% de variación
      progress = Math.min(100, Math.max(0, progress)); // Mantener entre 0-100%

      if (currentBar) {
        currentBar.style.width = `${progress}%`;
      }

      // Continuar hasta llegar a 100%
      if (progress < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        // Cuando llegue al 100%, ocultar automáticamente después de un breve delay
        setTimeout(() => {
          if (currentProgressLoader) {
            currentProgressLoader.classList.add("hidden-content-progress-loader");
            setTimeout(() => {
              if (currentProgressLoader) {
                currentProgressLoader.remove();
                currentProgressLoader = null;
                currentBar = null;
              }
            }, 300);
          }
        }, 500);
      }
    };

    // Iniciar el progreso automático
    requestAnimationFrame(updateProgress);

    // También escuchar eventos de carga de página para progreso más realista
    const handleLoadProgress = () => {
      if (currentBar && progress < 100) {
        progress = Math.min(100, progress + 3);
        currentBar.style.width = `${progress}%`;
      }
    };

    // Escuchar eventos de carga
    if (typeof window !== 'undefined') {
      window.addEventListener('DOMContentLoaded', handleLoadProgress);
      window.addEventListener('load', handleLoadProgress);

      // Limpiar listeners cuando se complete
      const cleanup = () => {
        window.removeEventListener('DOMContentLoaded', handleLoadProgress);
        window.removeEventListener('load', handleLoadProgress);
      };

      // Guardar función de limpieza para usar en complete()
      (currentBar as any).cleanup = cleanup;
    }
  }
};

/**
 * Completa la barra (100%) y la oculta
 */
export const complete = () => {
  if (!currentBar || !currentProgressLoader) return;

  // Limpiar event listeners si existen
  if ((currentBar as any).cleanup) {
    (currentBar as any).cleanup();
  }

  currentBar.style.width = "100%";

  setTimeout(() => {
    if (currentProgressLoader) {
      currentProgressLoader.classList.add("hidden-content-progress-loader");
      setTimeout(() => {
        if (currentProgressLoader) {
          currentProgressLoader.remove();
          currentProgressLoader = null;
          currentBar = null;
        }
      }, 300);
    }
  }, 200);
};

/**
 * Oculta la barra inmediatamente
 */
export const hide = () => {
  if (!currentProgressLoader) return;

  // Limpiar event listeners si existen
  if (currentBar && (currentBar as any).cleanup) {
    (currentBar as any).cleanup();
  }

  currentProgressLoader.classList.add("hidden-content-progress-loader");
  setTimeout(() => {
    if (currentProgressLoader) {
      currentProgressLoader.remove();
      currentProgressLoader = null;
      currentBar = null;
    }
  }, 300);
};

// Exportar objeto para compatibilidad
export const ProgressLoader = {
  start,
  complete,
  hide
};

// Mantener compatibilidad con la API anterior
const ProgressLoaderContainer = (options: ProgressLoaderOptions = {}): HTMLDivElement => {
  start(options);

  // Simular progreso automático para mantener compatibilidad
  let progress = 0;
  const interval = setInterval(() => {
    progress += 2;

    if (currentBar) {
      currentBar.style.width = `${progress}%`;
    }

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => complete(), 100);
    }
  }, 30);

  return currentProgressLoader!;
};

export { ProgressLoaderContainer };
