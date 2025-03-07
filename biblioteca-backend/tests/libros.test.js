const request = require('supertest');
const { app } = require('../src/index');
const Usuario = require('../src/models/Usuario');
const Libro = require('../src/models/Libro');

let token;
let libroId;

describe('Pruebas del CRUD de Libros', () => {
    beforeAll(async () => {
        await Usuario.deleteMany();
        await Libro.deleteMany();

        // Registrar un usuario para obtener un token
        await request(app).post('/api/auth/register').send({
            username: 'userTest',
            email: 'usertest@example.com',
            password: '123456',
        });

        // Obtener el token del usuario registrado
        const login = await request(app).post('/api/auth/login').send({
            email: 'usertest@example.com',
            password: '123456',
        });

        token = login.body.token;
        console.log('📌 Token generado:', token); // ✅ Depuración
    });


    afterAll(async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
    });
    it('Debe crear un libro', async () => {
        console.log('📌 Enviando token:', token); // ✅ Depuración

        const res = await request(app)
            .post('/api/libros')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'El Señor de los Anillos',
                author: 'J.R.R. Tolkien',
                year: 1954,
                genre: ['Fantasía', 'Accion'],
                coverImage: 'https://example.com/lotr.jpg'
            });

        console.log('📌 Respuesta de creación de libro:', res.body);

        expect(res.statusCode).toEqual(201);

        // 🔥 Guardar el ID del libro para futuras pruebas
        libroId = res.body._id;
    });
    it('Debe crear un segundo libro', async () => {
        console.log('📌 Enviando token:', token); // ✅ Depuración

        const res = await request(app)
            .post('/api/libros')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Harry Potter',
                author: 'J.K Rowling',
                year: 1954,
                genre: ['Fantasía', 'Magia'],
                coverImage: 'https://example.com/HP.jpg'
            });

        console.log('📌 Respuesta de creación de libro:', res.body);

        expect(res.statusCode).toEqual(201);

        // 🔥 Guardar el ID del libro para futuras pruebas
        libroId2 = res.body._id;
    });

    it('Debe obtener todos los libros', async () => {
        const res = await request(app)
            .get('/api/libros')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
    });

    it('Debe actualizar un libro', async () => {
        console.log('📌 Intentando actualizar libro con ID:', libroId); // ✅ Depuración

        const res = await request(app)
            .put(`/api/libros/${libroId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'El Hobbit',
                author: 'J.R.R. Tolkien',
                year: 1937
            });

        console.log('📌 Respuesta de actualización de libro:', res.body);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('title', 'El Hobbit');
    });

    it('Debe eliminar un libro', async () => {
        console.log('📌 Intentando eliminar libro con ID:', libroId); // ✅ Depuración

        const res = await request(app)
            .delete(`/api/libros/${libroId}`)
            .set('Authorization', `Bearer ${token}`);

        console.log('📌 Respuesta de eliminación de libro:', res.body);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('msg', 'Libro eliminado correctamente');
    });

    it('Debe manejar la eliminación de un libro inexistente', async () => {
        const res = await request(app)
            .delete(`/api/libros/65f5a1b4e3d2e45a5c5b6d3a`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('msg', 'Libro no encontrado');
    });
});
