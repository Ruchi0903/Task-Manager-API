import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri); // ✅ no need for old options
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});
