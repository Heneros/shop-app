// import { getAllUsers } from '../controllers/users';

const express = require('express');
const router = express.Router();

const { getAllUsers, registerUser, authUser, logoutUser, updateUser, deleteUser, getUserById, getUserProfile, updateUserProfile } = require('../controllers/users');
const { protect, admin } = require('../middleware/authMiddleware');



router.route('/').post(registerUser).get(protect, admin, getAllUsers);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.route('/profile').get(protect, getUserProfile)
    .put(protect, updateUserProfile);
    
router.route("/:id")
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser)

module.exports = router;