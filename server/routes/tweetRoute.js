const express = require('express');
const {
  checkIfTokenIsProvided,
  verifyToken,
} = require('../middleware/authJwt');
const tweetController = require('../controllers/tweetController');

const router = express.Router();

const cookieParser = require('cookie-parser');

router.use(cookieParser());

router.post('/',
  verifyToken,
  checkIfTokenIsProvided,
  tweetController.createTweet);
router.put('/:tweetID',
  verifyToken,
  checkIfTokenIsProvided,
  tweetController.update);
router.delete('/:tweetID',
  verifyToken,
  checkIfTokenIsProvided,
  tweetController.delete);
router.get('/:message',
  verifyToken,
  checkIfTokenIsProvided,
  tweetController.fetchAllByMessage);
router.get('/:sortingValue?',
  verifyToken,
  checkIfTokenIsProvided,
  tweetController.findAllTweets);

module.exports = router;
