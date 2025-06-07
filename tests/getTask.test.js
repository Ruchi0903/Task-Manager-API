import request from 'supertest';
import app from '../src/app.js';
import User from '../src/models/userModel.js';

// import dotenv from 'dotenv';
// dotenv.config();

describe('GET /api/tasks/getTasks', () => {
  let token;

  beforeAll(async () => {
    // ✂️ No need to reconnect, setup.js already handled it

    await User.deleteOne({ email: 'shanuuu@gmail.com' });

    const user = new User({
      username: 'Shanuuu',
      email: 'shanuuu@gmail.com',
      password: '123456789',
    });

    await user.save();

    const res = await request(app).post('/api/auth/login').send({
      email: 'shanuuu@gmail.com',
      password: '123456789',
    });

    token = res.body.token;
  });

  it('should return 200 OK', async () => {
    const res = await request(app)
      .get('/api/tasks/getTasks')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });

  afterAll(async () => {
    await User.deleteOne({ email: 'shanuuu@gmail.com' });
    // ✂️ No need to close connection — setup.js does that
  });
});