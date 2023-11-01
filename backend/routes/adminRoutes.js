import express from 'express';
import { createUser, deleteUser, editUser, getUsers } from '../controllers/adminController.js';
import { isAuthenticated, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/users', isAuthenticated, isAdmin, createUser);
router.get('/users', isAuthenticated, isAdmin, getUsers);
router.put('/users/:id', isAuthenticated, isAdmin, editUser);
router.delete('/users/:id', isAuthenticated, isAdmin, deleteUser);

export default router;