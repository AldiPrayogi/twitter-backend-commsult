const db = require('../models');
const Tweet = db.tweets;
const User = db.users;

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

exports.findAll = async() => {
  console.log('a');
  return Tweet.findAll({
    order: [
      ['createdAt', 'DESC'],
    ],
    include: [{model: User, required: true}],
  });
};

exports.deleteTweet = async(tweetID) => {
  return Tweet.destroy({where: {ID: tweetID}});
};


