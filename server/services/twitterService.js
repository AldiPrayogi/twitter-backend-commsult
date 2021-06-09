const {
  createTweet,
  findOneByID,
  updatePreviousTweet,
} = require('../repositories/tweetRepository');
const {v4} = require('uuid');
const jwt = require('jsonwebtoken');
const db = require('../models/index');

exports.createTweet = async(payload) => {
  const uuid = v4();
  const tweetID = uuid.substr(0, uuid.indexOf('-'));
  let flag = true;
  while (flag){
    const searchedTweet = await findOneByID(tweetID);
    if (!searchedTweet) flag = false;
  }
  const decodedToken = jwt.decode(payload.token);
  const userID = decodedToken.id;
  console.log(decodedToken + ' ' + userID);
  const newPayload = {
    ID: tweetID,
    userID: userID,
    previousTweet: tweetID,
    ...payload,
  };
  try {
    return await createTweet(newPayload);
  } catch (error){
    throw new Error('Failed to Create Tweet');
  }
};

exports.replyTweet = async(payload, previousTweetID) => {
  console.log('previousTweetID');
  const uuid = v4();
  const tweetID = uuid.substr(0, uuid.indexOf('-'));
  let flag = true;
  while (flag){
    const searchedTweet = await findOneByID(tweetID);
    if (!searchedTweet) flag = false;
  }
  const updatePreviousTweetPayload = {
    nextTweet: tweetID,
  };
  const decodedToken = jwt.decode(payload.token);
  const userID = decodedToken.id;
  const createNewTweetPayload = {
    ID: tweetID,
    userID: userID,
    previousTweet: previousTweetID,
    ...payload,
  };

  try {
    return await db.sequelize.transaction(async(t) => {
      const updatedPreviousTweet = await updatePreviousTweet(
        previousTweetID,
        updatePreviousTweetPayload,
        {transaction: t});
      console.log(updatedPreviousTweet[0]);

      const newlyCreatedTweet = await createTweet(
        createNewTweetPayload, {transaction: t});

      console.log(newlyCreatedTweet.dataValues);
      if (updatedPreviousTweet[0] === 0){
        throw new Error('Update Failed');
      }
      return newlyCreatedTweet;
    });
  } catch (error){
    throw new Error('Failed To Create New Tweet!');
  }
};

