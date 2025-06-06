import express from 'express';
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/taskController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes require authentication
router.post('/createTask', protect, createTask); // Create task
router.get('/getTasks', protect, getTasks); // Get all tasks for user

router.route('/:id')
    .put(protect, updateTask)     // Update task by ID
    .delete(protect, deleteTask); // Delete task by ID

export default router;