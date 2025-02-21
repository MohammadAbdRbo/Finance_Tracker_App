
const express = require('express');
const { registerUser, loginUser, logoutUser, verifyToken } = require('../controllers/authController');  

const router = express.Router();


router.post('/login', loginUser);


router.post('/register', registerUser);


router.post('/logout', verifyToken, logoutUser);

module.exports = router;
