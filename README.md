# Progress Loader JS

[![npm version](https://img.shields.io/npm/v/progress-loader-js.svg?style=flat-square)](https://www.npmjs.com/package/progress-loader-js)
[![GitHub Repo](https://img.shields.io/badge/repository-GitHub-blue?style=flat-square&logo=github)](https://github.com/urian121/progress-loader-js)
[![npm](https://img.shields.io/npm/dt/progress-loader-js.svg)](https://www.npmjs.com/package/progress-loader-js)

**Progress Loader** JS es un paquete versátil que permite mostrar una barra de progreso elegante y altamente personalizable en tus aplicaciones web. Con una implementación sencilla y opciones de personalización flexibles, añade un toque de profesionalismo y dinamismo a tu sitio. Ideal para cualquier proyecto que necesite mostrar el progreso de manera atractiva y eficaz.

## Casos de uso:

![demo](https://raw.githubusercontent.com/urian121/imagenes-proyectos-github/master/demo-progress-loader-js.gif)

![demo](https://raw.githubusercontent.com/urian121/imagenes-proyectos-github/master/progress-loader-js.gif)

## Instalación

```bash
  npm install progress-loader-js --save
  yarn add progress-loader-js
```

## 🚀 API Súper Fácil

### **API Moderna (Recomendada)**

```jsx
import { start, complete, hide } from "progress-loader-js";
import { useState, useEffect } from "react";

function App() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Iniciar barra de progreso
    start({
      backgroundColor: "#f8f9fa",
      barColor: "#ff6b35"
    });
    
    // Cargar menú desde API
    fetch('https://devsapihub.com/api-fast-food')
      .then(response => response.json())
      .then(data => {
        setMenu(data);
        // Completar progreso
        complete();
      })
      .catch(error => {
        console.error('Error:', error);
        // Ocultar en caso de error
        hide();
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>🍕 Menú de Comida Rápida</h1>
      
      {loading ? (
        <p>Cargando menú...</p>
      ) : (
        <div>
          <h2>📋 Productos Disponibles ({menu.length})</h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
            gap: '1rem',
            marginTop: '1rem'
          }}>
            {menu.slice(0, 6).map(item => (
              <div key={item.id} style={{
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '1rem',
                backgroundColor: '#fff'
              }}>
                <img 
                  src={item.image} 
                  alt={item.name}
                  style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }}
                />
                <h3 style={{ margin: '0.5rem 0', fontSize: '16px' }}>{item.name}</h3>
                <p style={{ color: '#ff6b35', fontWeight: 'bold', fontSize: '18px' }}>
                  ${item.price}
                </p>
                <span style={{ 
                  backgroundColor: '#f0f0f0', 
                  padding: '0.25rem 0.5rem', 
                  borderRadius: '12px',
                  fontSize: '12px',
                  textTransform: 'capitalize'
                }}>
                  {item.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
```

### **API Básica (Compatibilidad)**

```jsx
import { ProgressLoaderContainer } from "progress-loader-js";
import { useState, useEffect } from "react";

function App() {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    // Activar barra automática
    ProgressLoaderContainer({
      backgroundColor: "#f8f9fa",
      barColor: "#10b981",
    });
    
    // Cargar solo pizzas desde API
    fetch('https://devsapihub.com/api-fast-food/category/pizza')
      .then(response => response.json())
      .then(data => {
        setPizzas(data.slice(0, 4)); // Solo primeras 4 pizzas
        console.log('Pizzas cargadas:', data.length);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🍕 Pizzas Disponibles</h1>
      
      {pizzas.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h2>📋 Nuestras Pizzas ({pizzas.length})</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
            {pizzas.map(pizza => (
              <div key={pizza.id} style={{
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '1rem',
                backgroundColor: '#fff'
              }}>
                <img 
                  src={pizza.image} 
                  alt={pizza.name}
                  style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }}
                />
                <h3 style={{ margin: '0.5rem 0', color: '#10b981' }}>
                  {pizza.name}
                </h3>
                <p style={{ color: '#10b981', fontWeight: 'bold', fontSize: '18px' }}>
                  ${pizza.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
```

## Ejemplo Práctico utilizando Next.js, navegación entre paginas

![Ver Código en GitHub](https://raw.githubusercontent.com/urian121/imagenes-proyectos-github/master/navegacion-entre-paginas-con-progress-loader-js.gif)

```jsx
"use client";
import { start, complete, hide } from "progress-loader-js";
import { useEffect, useState } from "react";

export default function MenuPage() {
  const [cafes, setCafes] = useState([]);

  useEffect(() => {
    // Iniciar barra de progreso al cargar la página
    start({
      backgroundColor: "#f0f0f0",
      barColor: "#8b5cf6"
    });

    // Cargar solo cafés desde API
    fetch('https://devsapihub.com/api-fast-food/category/cafe')
      .then(response => response.json())
      .then(data => {
        setCafes(data.slice(0, 6)); // Solo primeros 6 cafés
        // Completar progreso
        complete();
      })
      .catch(error => {
        console.error('Error:', error);
        // Ocultar en caso de error
        hide();
      });
  }, []);

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>☕ Cafés Disponibles</h1>
      <p>Cafés cargados automáticamente al abrir la página</p>
      
      {cafes.length > 0 && (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
          gap: '1rem',
          marginTop: '2rem'
        }}>
          {cafes.map(cafe => (
            <div key={cafe.id} style={{
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: '#fff'
            }}>
              <img 
                src={cafe.image} 
                alt={cafe.name}
                style={{ width: '100%', height: '150px', objectFit: 'cover' }}
              />
              <div style={{ padding: '1rem' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '14px', color: '#8b5cf6' }}>
                  {cafe.name}
                </h3>
                <p style={{ margin: '0', fontSize: '16px', color: '#8b5cf6', fontWeight: 'bold' }}>
                  ${cafe.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

👉 [Ver Código en GitHub](https://github.com/urian121/app-nextjs-con-progress-loader-js)

## Características

- Fácil implementación: Agrega indicadores de progreso con solo unas líneas de código.
- Compatible con varios frameworks: Funciona sin problemas en React, Vue, Angular, Next, Svelte y más.
- Personalización flexible: Ajusta colores del spinner y texto de carga según tus necesidades.
- Instalación rápida: Se integra fácilmente via npm o yarn en minutos.
- **Inyección automática de CSS**: Los estilos se cargan automáticamente, no necesitas importar archivos CSS manualmente.
- Soporte para operaciones asíncronas: Ideal para carga de datos y navegación entre páginas.
- Animaciones suaves: Mejora la experiencia de usuario con animaciones CSS.
- Eficiencia y rendimiento: Diseñado para impactar mínimamente el rendimiento de la aplicación.
- Documentación completa: Incluye ejemplos prácticos y guías detalladas.
- Mantenimiento activo: Actualizaciones frecuentes y mejoras continuas.
- Licencia abierta: Publicado bajo licencia ISC, apto para uso comercial y personal.

## 📚 API Completa

### **API Moderna (Solo 3 funciones)**

#### `start(options?)`
Inicia la barra de progreso con progreso automático (como YouTube).

```js
start({
  backgroundColor: "#e0e0e0",
  barColor: "#4CAF50"
});
```

#### `complete()`
Completa la barra (100%) y la oculta automáticamente.

```js
complete();
```

#### `hide()`
Oculta la barra inmediatamente.

```js
hide();
```

### **API Básica (Compatibilidad)**

#### `ProgressLoaderContainer(options?)`
Función original que mantiene compatibilidad con versiones anteriores.

```js
ProgressLoaderContainer({
  backgroundColor: "#ccc",
  barColor: "#f11946"
});
```

### **Opciones de Configuración**

- **backgroundColor**: Color de fondo de la barra de progreso (default: `#ccc`)
- **barColor**: Color de la barra de progreso (default: `#f11946`)

### Contribuir

Si encuentras algún problema o tienes una idea para mejorar el paquete, por favor abre un issue o envía un pull request en GitHub: https://github.com/urian121/progress-loader-js

## Desarrollado por

- [Urian Viera](https://github.com/urian123)
- [Mi portafolio](https://www.urianviera.com)
- [Canal de Youtube](https://www.youtube.com/WebDeveloperUrianViera)
- [¡Donar a través de PayPal!](https://www.paypal.com/donate/?hosted_button_id=4SV78MQJJH3VE)
- [Email](mailto:urian1213viera@gmail.com)

## Copyright

© 2024 Urian Viera. Todos los derechos reservados.

## License

Licensed under ISC

[![GitHub](https://img.shields.io/badge/GitHub-urian121progress-loader-js-181717?logo=github&style=flat-square)](https://github.com/urian121/progress-loader-js)

## Agradecimientos

¡Gracias a todos los **Devs** 👨‍💻 que han utilizado y contribuido al desarrollo de **Progress Loader JS**! Su apoyo y retroalimentación son fundamentales para mejorar continuamente este paquete.
