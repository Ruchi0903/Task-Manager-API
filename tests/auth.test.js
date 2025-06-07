import request from 'supertest';
import app from "../src/app.js";
import User from '../src/models/userModel.js';

describe('Auth Routes', () => {
    const testUser = {
        username: 'TestUser',
        email: 'test@gmail.com',
        password: 'testpassword',
    };

    beforeEach(async () => {
        await User.deleteMany({}) // Clean test DB before each test
    });

    afterAll(async () => {
        await User.deleteMany({});
    });

    describe('POST /api/auth/register', () => {
        it('should register a new user', async () => {
            const res = await request(app).post('/api/auth/register').send(testUser);


            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('token');
            expect(res.body.email).toBe(testUser.email);
        });

        it('should NOT register duplicate user', async () => {
            await request(app).post('/api/auth/register').send(testUser);

            const res = await request(app).post('/api/auth/register').send(testUser);

            expect(res.statusCode).toBe(400);
        });

        it('should return 400 if missing fields', async () => {
            const res = await request(app).post('/api/auth/register').send({
                email: 'incomplete@example.com',
            });

            expect(res.statusCode).toBe(400);
        });
    });

    describe('POST /api/auth/login', () => {
        beforeEach(async () => {
            await request(app).post('/api/auth/register').send(testUser);
        });

        it('should login with valid credentials', async () => {
            const res = await request(app).post('/api/auth/login').send({
                email: testUser.email,
                password: testUser.password,
            });

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('token');
        });

        it('should NOT login with wrong password', async () => {
            const res = await request(app).post('/api/auth/login').send({
                email: testUser.email,
                password: 'wrongpassword',
            });

            expect(res.statusCode).toBe(401);
        });

        it('should NOT login with non-existing email', async () => {
            const res = await request(app).post('/api/auth/login').send({
                email: 'ghost@example.com',
                password: 'somepass',
            });

            expect(res.statusCode).toBe(401);
        });
    });
});