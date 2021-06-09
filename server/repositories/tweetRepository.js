const db = require('../models');
const Tweet = db.tweets;

exports.createTweet = async(payload) => {
  console.log('masuk buat barus');
  return Tweet.create(payload);
};

exports.findOneByPreviousTweet = async(previousTweet) => {
  return Tweet.findOne({where: {previousTweet: previousTweet}});
};

exports.findOneByID = async(tweetID) => {
  return Tweet.findByPk(tweetID);
};

exports.findOneByNextTweet = async(nextTweet) => {
  return Tweet.findOne({where: {nextTweet: nextTweet}});
};

exports.updatePreviousTweet = async(tweetID, payload) => {
  console.log('masuk update');
  return Tweet.update(payload, {
    where: {ID: tweetID},
  });
};

