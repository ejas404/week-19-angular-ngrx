import express from 'express';
import { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile, fetchProfilePic } from '../controllers/userController.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
import upload from '../config/files.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.route('/profile')
    .get(isAuthenticated, getUserProfile)
    .put(isAuthenticated, upload.single('profilePicture'), updateUserProfile);
router.get('/profile/avatar', isAuthenticated, fetchProfilePic);

export default router;