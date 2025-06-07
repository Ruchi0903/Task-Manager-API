import express from 'express';
import { registerUser, loginUser, getMe, deleteUser } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.delete('/delete', protect, deleteUser);

export default router;