const request = require('supertest');
const { app } = require('../src/index');
const Usuario = require('../src/models/Usuario');
const Libro = require('../src/models/Libro');
const Review = require('../src/models/Review');

let token;
let libroId;
let reviewId;

describe('Pruebas del CRUD de Reseñas', () => {
    beforeAll(async () => {
        await Usuario.deleteMany();
        await Libro.deleteMany();
        await Review.deleteMany();

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
        console.log('📌 Token generado:', token);

        const libroRes = await request(app)
            .post("/api/libros")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "El Señor de los Anillos",
                author: "J.R.R. Tolkien",
                year: 1954,
                genre: ["Fantasía"],
                coverImage: "https://example.com/lotr.jpg",
            });

        if (libroRes.status !== 201) {
            throw new Error("❌ No se pudo crear el libro. Verifica el endpoint.");
        }

        libroId = libroRes.body._id;
        console.log("📌 Libro creado con ID:", libroId);
    });

    afterAll(async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
    });

    it("Debe crear una reseña", async () => {
        console.log("📌 Enviando token:", token);

        const res = await request(app)
            .post("/api/reviews")
            .set("Authorization", `Bearer ${token}`)
            .send({
                bookId: libroId,
                rating: 9,
                comment: "Excelente libro!",
            });

        console.log("📌 Respuesta de creación de reseña:", res.body);
        expect(res.statusCode).toEqual(201);

        reviewId = res.body._id;
        console.log("📌 ID de la reseña creada:", reviewId);
    });

    it("Debe actualizar una reseña", async () => {
        console.log("📌 Intentando actualizar reseña con ID:", reviewId);

        const res = await request(app)
            .put(`/api/reviews/${reviewId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                rating: 8,
                comment: "Buen libro, pero un poco largo.",
            });

        console.log("📌 Respuesta de actualización de reseña:", res.body);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("rating", 8);
        expect(res.body).toHaveProperty("comment", "Buen libro, pero un poco largo.");
    });

    it("Debe eliminar una reseña", async () => {
        console.log("📌 Intentando eliminar reseña con ID:", reviewId);

        const res = await request(app)
            .delete(`/api/reviews/${reviewId}`)
            .set("Authorization", `Bearer ${token}`);

        console.log("📌 Respuesta de eliminación de reseña:", res.body);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("msg", "Reseña eliminada correctamente.");
    });
});
