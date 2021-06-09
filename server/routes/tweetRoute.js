const express = require('express');
const {
  checkIfTokenIsProvided,
  verifyToken,
} = require('../middleware/authJwt');
const tweetController = require('../controllers/tweetController');

const router = express.Router();

router.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept',
  );
  next();
});

router.post('/', [
  verifyToken,
  checkIfTokenIsProvided,
], tweetController.createTweet);
router.post('/:tweetID/reply', [
  verifyToken,
  checkIfTokenIsProvided,
], tweetController.createTweet);

module.exports = router;