// import { getAllUsers } from '../controllers/users';

const express = require('express');
const router = express.Router();

const { getAllUsers, registerUser, authUser } = require('../controllers/users');

router.route('/').post(registerUser).get(getAllUsers);
router.post('/auth', authUser);
module.exports = router;