// import { getAllUsers } from '../controllers/users';

const express = require('express');
const router = express.Router();

const { getAllUsers, registerUser, authUser, logoutUser } = require('../controllers/users');
const { protect, admin } = require('../middleware/authMiddleware');



router.route('/').post(registerUser).get(protect, admin, getAllUsers);
router.post('/auth', authUser);
router.post('/logout', logoutUser);

module.exports = router;