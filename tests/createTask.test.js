import request from 'supertest';
import app from '../src/app.js';
import User from '../src/models/userModel.js';
import Task from '../src/models/taskModel.js';

describe('POST /api/tasks/createTask', () => {
  let token;

  const testUser = {
    username: 'TaskCreator',
    email: 'taskcreator@example.com',
    password: 'taskpass123',
  };

  beforeAll(async () => {
    await User.deleteMany({});
    await Task.deleteMany({});

    await request(app).post('/api/auth/register').send(testUser);

    const loginRes = await request(app).post('/api/auth/login').send({
      email: testUser.email,
      password: testUser.password,
    });

    token = loginRes.body.token;
  });

  afterAll(async () => {
    await Task.deleteMany({});
    await User.deleteMany({});
  });

  it('should create a task with valid token and data', async () => {
    const res = await request(app)
      .post('/api/tasks/createTask')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Task',
        description: 'Do something important',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.title).toBe('Test Task');
  });

  it('should NOT create task with missing title', async () => {
    const res = await request(app)
      .post('/api/tasks/createTask')
      .set('Authorization', `Bearer ${token}`)
      .send({
        description: 'Missing title',
      });

    expect(res.statusCode).toBe(400); // or 422 depending on your validation
  });

  it('should NOT create task without token', async () => {
    const res = await request(app)
      .post('/api/tasks/createTask')
      .send({
        title: 'Should not be created',
        description: 'Unauthorized',
      });

    expect(res.statusCode).toBe(401);
  });
});