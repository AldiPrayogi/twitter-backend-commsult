const db = require('../models');
const Tweet = db.tweets;

exports.createTweet = async(payload) => {
  return Tweet.create(payload);
};

exports.findOneByID = async(tweetID) => {
  return Tweet.findByPk(tweetID);
};

exports.updateMessage = async(tweetID, payload) => {
  return Tweet.update(payload, {
    where: {ID: tweetID},
  });
};

exports.deleteTweet = async(tweetID) => {
  return Tweet.destroy({where: {ID: tweetID}});
};


