// import { getAllUsers } from '../controllers/users';

const express = require('express');
const router = express.Router();

const { getAllUsers, registerUser, authUser, logoutUser } = require('../controllers/users');


router.route('/').post(registerUser).get(getAllUsers);
router.post('/auth', authUser);
router.post('/logout', logoutUser);

module.exports = router;