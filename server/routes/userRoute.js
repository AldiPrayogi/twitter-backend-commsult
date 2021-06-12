const express = require('express');
const {
  checkIfTokenIsProvided,
  verifyToken,
  verifyIfUserIsValid,
} = require('../middleware/authJwt');
const UserController = require('../controllers/userController');

const router = express.Router();
const cookieParser = require('cookie-parser');

router.use(cookieParser());

router.get('/:userID', UserController.find);
router.put('/:userID', [
  checkIfTokenIsProvided,
  verifyToken,
  verifyIfUserIsValid,
], UserController.update);
router.get('/', UserController.findAll);

module.exports = router;
