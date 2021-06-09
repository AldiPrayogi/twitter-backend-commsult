const {
  createTweet,
  replyTweet,
} = require('../services/twitterService');

exports.createTweet = async(req, res) => {
  const token = req.get('x-access-token');
  const payload = {
    token,
    ...req.body,
  };

  try {
    let createdTweet;
    console.log(req.params);
    if (req.params.tweetID){
      createdTweet = await replyTweet(payload, req.params.tweetID);
    }
    if (!req.params.tweetID){
      createdTweet = await createTweet(payload);
    }
    res.send({
      status: 200,
      createdTweet: createdTweet,
    });
  } catch (error){
    res.status(500).send({
      message: error.message,
    });
  }
};

