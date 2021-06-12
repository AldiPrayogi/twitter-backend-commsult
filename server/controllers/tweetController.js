const {
  createTweet,
  updateTweet,
  deleteTweet,
  fetchAllTweets,
} = require('../services/tweetService');

exports.findAllTweets = async(req, res) => {
  try {
    const allTweets = await fetchAllTweets();
    res.status(200).send(allTweets);
  } catch (error){
    res.status(204).send({
      message: error.message,
    });
  }
};

exports.createTweet = async(req, res) => {
  const token = req.cookies.token;
  const payload = {
    token,
    ...req.body,
  };

  try {
    const createdTweet = await createTweet(payload);
    res.send({
      status: 201,
      createdTweet: createdTweet,
    });
  } catch (error){
    res.status(500).send({
      message: error.message,
    });
  }
};

exports.update = async(req, res) => {
  const token = req.cookies.token;

  const payload = {
    token,
    ...req.body,
  };

  try {
    await updateTweet(req.params.tweetID, payload);

    res.send({
      status: 201,
      message: 'Tweet Updated',
    });

  } catch (error){
    res.status(500).send({
      message: error.message,
    });
  }
};

exports.delete = async(req, res) => {
  const token = req.cookies.token;
  const tweetID = req.params.tweetID;
  const payload = {
    token,
    tweetID,
  };

  try {
    await deleteTweet(payload);

    res.send({
      status: 200,
      message: 'Tweet Deleted Successfully',
    });
  } catch (error){
    res.status(500).send({
      message: error.message,
    });
  }
};


