const db = require('../models');
const Tweet = db.tweets;
const User = db.users;
const {Op} = require('sequelize');

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

exports.findAll = async(sortingValue) => {
  return Tweet.findAll({
    order: [
      ['createdAt', sortingValue],
    ],
    include: [{model: User, required: true}],
  });
};

exports.deleteTweet = async(tweetID) => {
  return Tweet.destroy({where: {ID: tweetID}});
};

exports.findAllByMessage = async(message) => {
  return Tweet.findAll({
    where: {
      message: {
        [Op.iLike]: '%' + message + '%',
      },
    },
    include: [{model: User, required: true}],
  });
};


