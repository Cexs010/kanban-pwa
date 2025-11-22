# Kanban PWA

Aplicación Web Progresiva (PWA) desarrollada con **React + Vite**, diseñada para gestionar tareas mediante un tablero Kanban moderno, responsivo y fácil de usar.

Este documento explica cómo **descargar**, **configurar**, **instalar**, **ejecutar** y **usar** el proyecto en local, incluyendo la configuración de **Firebase**.

---

## Características principales

* Tablero Kanban totalmente funcional
* Instalación como PWA en navegadores compatibles
* Integración con **Firebase** (autenticación, almacenamiento, persistencia)
* Construido con **React + Vite**

---

## Requisitos previos

Asegúrate de tener instalado:

* **Node.js 18+**
* **npm**
* **Git**

Verificar versiones:

```
node -v
npm -v
```

---

## Descargar o clonar el repositorio

### Clonar con Git

```
git clone https://github.com/Cexs010/kanban-pwa.git
cd kanban-pwa
```

### Descargar ZIP

1. Ir al repositorio en GitHub
2. Clic en **Code → Download ZIP**
3. Descomprimir
4. Abrir la carpeta

---

## ⚙️ Configuración del entorno (.env)

Crear un archivo `.env` en la raíz.

### Ejemplo de `.env.example`:

```
VITE_FIREBASE_API_KEY=YOUR_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID
```


---

## Instalación de dependencias

```
npm install
```

---

## ▶️ Ejecutar el proyecto en local

```
npm run dev
```

Abrir en el navegador:

```
http://localhost:5173
```

---

## 📱 Instalación como PWA

1. Abrir la aplicación en Chrome/Edge
2. Clic en el botón “Instalar aplicación”
3. Confirmar
4. La app queda disponible offline

---

## 📁 Estructura del proyecto

```
kanban-pwa/
│── public/
│   ├── manifest.json
│   └── icons/
│
│── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── context/
│   ├── services/
│   └── main.jsx
│
│── .env.example
│── package.json
│── vite.config.js
```
