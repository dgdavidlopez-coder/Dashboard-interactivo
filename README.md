# 🌐 Dashboard Interactivo

Este es un proyecto de **dashboard interactivo** creado con **HTML, CSS, JavaScript y Node.js**, que combina varias funcionalidades:

- **Clima**: Muestra el clima de cualquier ciudad usando la API de OpenWeatherMap.  
- **Criptomonedas**: Consulta el precio actual de criptos.  
- **Modo oscuro**: Interfaz con modo oscuro opcional.  
- **Última ciudad guardada**: Almacena la última búsqueda usando `localStorage`.

El backend en Node.js protege tu API Key, evitando que esté expuesta en el frontend.

---

## 🔹 Demo Online

Puedes ver el proyecto funcionando en línea aquí:  
[Dashboard Interactivo](https://dashboard-interactivo.onrender.com)

---

## 📂 Estructura del proyecto
/dashboard-interactivo
├── public/ ← Frontend (HTML, CSS, JS)
│ ├── index.html
│ ├── app.js
│ └── style.css
├── server.js ← Backend Node.js
├── package.json
├── package-lock.json
└── .gitignore ← Ignora node_modules/ y .env
