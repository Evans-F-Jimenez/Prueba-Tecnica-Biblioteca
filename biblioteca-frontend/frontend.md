# Documentación del Frontend

## Descripción

El frontend es una aplicación desarrollada en React utilizando Vite. Se encarga de la interacción del usuario con la API backend para la gestión de libros, autenticación de usuarios y administración de reseñas.

## Tecnologías Utilizadas

- ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
  Biblioteca para la interfaz de usuario
- ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
  Herramienta de desarrollo rápido
- ![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white)
  Manejo del estado global
- ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
  Navegación entre vistas
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
  Framework de estilos
- ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge)
  Cliente HTTP para comunicación con el backend

## Estructura del Proyecto

```
frontend/
│── src/
│   ├── components/
│   ├── pages/
│   ├── store/
│   ├── context/
│   ├── styles/
│   ├── main.jsx
│   ├── App.jsx
│── public/
│── index.html
│── vite.config.js
```

## Rutas de la Aplicación (React Router)

- `/` → Inicio
- `/login` → Inicio de sesión
- `/register` → Registro de usuarios
- `/profile` → Perfil del usuario
- `/insertbook` → Agregar un nuevo libro
- `/libro/:id` → Ver detalles de un libro

## Autenticación

### Login

- Se usa Redux Toolkit para manejar el estado de autenticación.
- Al iniciar sesión, se obtiene un token JWT del backend y se almacena en Redux.
- Si el login es exitoso, se redirige al usuario a la página principal.

### Registro

- Se envía la información del usuario al backend.
- Si el registro es exitoso, se redirige al login.

### Cierre de Sesión

- Se elimina el token almacenado y se resetea el estado en Redux.

## Componentes Principales

- **Topbar** → Barra de navegación con el botón para alternar el tema oscuro/claro.
- **BookList** → Muestra la lista de libros obtenida desde el backend.
- **Profile** → Configuraciones del usuario.

## Integración con el Backend (Axios)

Ejemplo de petición a la API:

```jsx
axios
  .get(`${import.meta.env.VITE_API_URL}/libros`)
  .then((res) => setLibros(res.data.libros))
  .catch((err) => console.error(err));
```

## Despliegue

Para construir el frontend para producción:

```bash
npm run build
```

## Licencia

Este proyecto está licenciado bajo la MIT License.
