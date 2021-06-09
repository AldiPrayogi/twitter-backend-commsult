const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();

router.post('/register', UserController.create);
router.get('/:userID', UserController.find);
router.put('/:userID', UserController.update);
router.get('/', UserController.findAll);

module.exports = router;
