const request = require('supertest');
const { app } = require('../src/index');
const Usuario = require('../src/models/Usuario');

describe('Pruebas de Autenticación', () => {
    beforeAll(async () => {
        await Usuario.deleteMany();
    });

    afterAll(async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
    });

    it('Debe registrar un usuario y permitir el login', async () => {
        console.log('📌 Usuarios en BD antes del registro:', await Usuario.find()); // Imprime la BD antes

        // Registrar usuario
        const registro = await request(app).post('/api/auth/register').send({
            username: 'user1',
            email: 'user@example.com',
            password: '123456',
        });

        console.log('📌 Respuesta de registro:', registro.body); // Depuración
        console.log('📌 Usuarios en BD después del registro:', await Usuario.find()); // Imprime la BD después

        expect(registro.statusCode).toEqual(201);
        expect(registro.body).toHaveProperty('msg', 'Usuario registrado correctamente');
    });

    it('Debe permitir iniciar sesión', async () => {
        console.log('📌 Usuarios en BD antes del login:', await Usuario.find()); // Imprime la BD antes del login

        const login = await request(app).post('/api/auth/login').send({
            email: 'user@example.com',
            password: '123456',
        });

        console.log('📌 Respuesta de login:', login.body); // Depuración

        expect(login.statusCode).toEqual(200);
        expect(login.body).toHaveProperty('token'); // Verifica que haya un token en la respuesta
    });
});
