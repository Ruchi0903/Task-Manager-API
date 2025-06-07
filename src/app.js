import express from 'express';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';

const app = express();

// Middleware
app.use(express.json());
app.use(errorHandler);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Sample route
app.get('/', (req, res) => {
  res.send('Task Manager API is running 🚀');
});

export default app;