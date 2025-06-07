import request from 'supertest';
import app from '../src/app.js';
import User from '../src/models/userModel.js';
import Task from '../src/models/taskModel.js';

describe('DELETE /api/tasks/:id', () => {
  let token;
  let taskId;

  const testUser = {
    username: 'DeleteTester',
    email: 'delete@example.com',
    password: 'deletepass',
  };

  beforeAll(async () => {
    await User.deleteMany({});
    await Task.deleteMany({});

    // Register & login
    await request(app).post('/api/auth/register').send(testUser);
    const loginRes = await request(app).post('/api/auth/login').send({
      email: testUser.email,
      password: testUser.password,
    });
    token = loginRes.body.token;

    // Create a task
    const taskRes = await request(app)
      .post('/api/tasks/createTask')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Task to delete', description: 'Remove me' });

    taskId = taskRes.body._id;
  });

  it('should delete a task by ID', async () => {
    const res = await request(app)
      .delete(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/removed/i);
  });

  it('should return 404 if task not found', async () => {
    const fakeId = '64b6f6f60000000000000000'; // Valid but non-existent
    const res = await request(app)
      .delete(`/api/tasks/${fakeId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(404);
  });
});
