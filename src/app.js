import express from 'express';
import authRoutes from './routes/authRoutes.js';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Sample route
app.get('/', (req, res) => {
  res.send('Task Manager API is running 🚀');
});

export default app;