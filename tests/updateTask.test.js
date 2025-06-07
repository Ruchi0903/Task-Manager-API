import request from 'supertest';
import app from '../src/app.js';
import User from '../src/models/userModel.js';
import Task from '../src/models/taskModel.js';

describe('PUT /api/tasks/:id', () => {
  let token;
  let taskId;

  const testUser = {
    username: 'Updater',
    email: 'update@example.com',
    password: 'updatepass',
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

    const taskRes = await request(app)
      .post('/api/tasks/createTask')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Original Title', description: 'Original Desc' });

    taskId = taskRes.body._id;
  });

  it('should update a task by ID', async () => {
    const res = await request(app)
      .put(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Updated Title', description: 'Updated Desc' });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Updated Title');
  });

  it('should return 404 for non-existent task', async () => {
    const fakeId = '64b6f6f60000000000000000';
    const res = await request(app)
      .put(`/api/tasks/${fakeId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'New Title' });

    expect(res.statusCode).toBe(404);
  });
});
