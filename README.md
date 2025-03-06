# Prueba Tecnica de Biblioteca Personal.

### Proyecto Biblioteca - Documentación General

### Descripción

Este es un sistema de gestión de biblioteca personal desarrollado en **MERN Stack (MongoDB, Express.js, React, Node.js)**. Permite la administración de libros, autenticación de usuarios y gestión de reseñas.

## Tecnologías Utilizadas

### Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Bcrypt](https://img.shields.io/badge/Bcrypt-4B0082?style=for-the-badge)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![Supertest](https://img.shields.io/badge/Supertest-blue?style=for-the-badge)

### Frontend

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge)

## Instalación del Proyecto

### Prerrequisitos

- Tener instalado **Node.js** y **npm**
- Tener **MongoDB Community Server** instalado

### Instalación de MongoDB Community Server

1. Descarga MongoDB desde su página oficial: [MongoDB Community Server](https://www.mongodb.com/try/download/community)
2. Instálalo y selecciona la opción **Run MongoDB as a Service**
3. Verifica la instalación ejecutando:
   ```bash
   mongod --version
   ```
4. Inicia el servicio de MongoDB:
   ```bash
   mongod
   ```

### Configuración del Backend

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/Evans-F-Jimenez/Prueba-Tecnica-Biblioteca.git
   ```
2. Navegar al directorio del backend:
   ```bash
   cd biblioteca-backend
   ```
3. Instalar dependencias:
   ```bash
   npm install
   ```
4. Configurar las variables de entorno en `biblioteca-backend/.env`:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/biblioteca
   JWT_SECRET=tu_secreto
   ```
5. Iniciar el servidor:
   ```bash
   npm run dev
   ```

### Configuración del Frontend

1. Navegar al directorio del frontend:
   ```bash
   cd biblioteca-frontend
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Configurar las variables de entorno en `biblioteca-frontend/.env`:
   ```env
   API_URL=http://localhost:5000/api
   ```
4. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

## Pruebas

1. Navegar al directorio del backend:

   ```bash
   cd biblioteca-backend
   ```

2. Para ejecutar las pruebas del backend:
   ```bash
   npm run test
   ```

## Despliegue

Para construir y desplegar la aplicación:

```bash
npm run build
```

## Este proyecto es una prueba tecnica

### Con el objetivo de ver las capacidades actuales que se posee a la hora de la creacion de fullstack.
