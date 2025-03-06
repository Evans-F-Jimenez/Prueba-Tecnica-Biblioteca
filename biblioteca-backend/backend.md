# Documentación del Backend

## Descripción

Este backend es una API RESTful construida con **Node.js** y **Express**, utilizando **MongoDB** como base de datos. La API gestiona la autenticación de usuarios, la administración de libros y las reseñas.

## Tecnologías Utilizadas

- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) Entorno de ejecución de JavaScript
- ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) Framework para Node.js
- ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white) Base de datos NoSQL
- ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongodb&logoColor=white) ODM para MongoDB
- ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=jsonwebtokens&logoColor=white) Autenticación segura
- ![Bcrypt](https://img.shields.io/badge/Bcrypt-4B0082?style=for-the-badge)
  Hashing de contraseñas
- ![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
  ![Supertest](https://img.shields.io/badge/Supertest-blue?style=for-the-badge) Pruebas unitarias y de integración

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/Evans-F-Jimenez/Prueba-Tecnica-Biblioteca.git
   ```
2. Entrar en el directorio del backend:
   ```bash
   cd biblioteca-backend
   ```
3. Instalar dependencias:
   ```bash
   npm install
   ```
4. Crear un archivo `.env` en la raiz y agregar las variables de entorno necesarias:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/biblioteca
   JWT_SECRET=tu_secreto
   ```
5. Iniciar el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```

## Estructura del Proyecto

```
backend/
│── src/
│   ├── config/
│   │   ├── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── libroController.js
│   │   ├── reviewController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   ├── models/
│   │   ├── Usuario.js
│   │   ├── Libro.js
│   │   ├── Review.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── libroRoutes.js
│   │   ├── reviewRoutes.js
│   ├── tests/
│   │   ├── auth.test.js
│   │   ├── libros.test.js
│   │   ├── setup.js
|   ├── index.js
│── package-lock.json
│── package.json
│── jest.config
```

## Endpoints

### Autenticación

- **`POST /api/auth/register`** - Registrar un usuario
- **`POST /api/auth/login`** - Iniciar sesión y obtener un token

### Libros

- **`POST /api/libros`** - Crear un nuevo libro _(requiere autenticación)_
- **`GET /api/libros`** - Obtener todos los libros _(requiere autenticación)_
- **`PUT /api/libros/:id`** - Actualizar un libro _(requiere autenticación)_
- **`DELETE /api/libros/:id`** - Eliminar un libro _(requiere autenticación)_

### Reseñas

- **`POST /api/reviews`** - Crear una reseña _(requiere autenticación)_
- **`GET /api/reviews/:bookId`** - Obtener todas las reseñas de un libro _(requiere autenticación)_

## Pruebas (Tests)

Las pruebas se encuentran en la carpeta `tests/` y están implementadas con **Jest** y **Supertest**.

### Ejecutar pruebas:

```bash
npm test
```

### Tests disponibles:

- `auth.test.js` - Pruebas de autenticación (registro y login)
- `libros.test.js` - Pruebas del CRUD de libros
- `setup.js` - Configuración y limpieza de la base de datos antes de cada test

## Middleware de Autenticación

El middleware `authMiddleware.js` se encarga de verificar el token JWT en las rutas protegidas:

```js
const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");

exports.authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await Usuario.findById(decoded.id);
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token no válido" });
  }
};
```

## Conexión con MongoDB

El archivo `db.js` maneja la conexión a la base de datos:

```js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("📌 MongoDB conectado");
  } catch (error) {
    console.error("❌ Error de conexión a MongoDB: ", error);
    process.exit(1);
  }
};

module.exports = connectDB;
```

## Despliegue

Para ejecutar en producción:

```bash
npm start
```
