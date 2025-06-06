import { protect } from '../middleware/authMiddleware.js';

// Protect all routes
router.use(protect); // apply this before all the routes
