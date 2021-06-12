const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();
const cookieParser = require('cookie-parser');

router.use(cookieParser());

router.post('/signup', authController.signUp);
router.post('/login', authController.signIn);
router.post('/verify', authController.verify);

module.exports = router;
