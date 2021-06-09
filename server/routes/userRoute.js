const express = require('express');
const {
  checkIfTokenIsProvided,
  verifyToken,
  verifyIfUserIsValid,
} = require('../middleware/authJwt');
const UserController = require('../controllers/userController');

const router = express.Router();

router.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept',
  );
  next();
});

router.get('/:userID', UserController.find);
router.put('/:userID', [
  checkIfTokenIsProvided,
  verifyToken,
  verifyIfUserIsValid,
], UserController.update);
router.get('/', UserController.findAll);

module.exports = router;
