const {
  createTweet,
  findOneByID,
  updateMessage,
  deleteTweet,
  findAll,
} = require('../repositories/tweetRepository');
const {v4} = require('uuid');
const jwt = require('jsonwebtoken');

exports.fetchAllTweets = async() => {
  const fetchedTweets = await findAll();
  if (!fetchedTweets){
    throw new Error('No Tweet Found!');
  }
  return fetchedTweets.map((tweet) => {
    return tweet.dataValues;
  });
};

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
  const newPayload = {
    ID: tweetID,
    userID: userID,
    ...payload,
  };
  const createdTweet = await createTweet(newPayload);
  if (!createdTweet.dataValues) throw new Error('Failed To Create Tweet!');
  return createdTweet;
};

exports.updateTweet = async(tweetId, payload) => {
  const decodedToken = jwt.decode(payload.token);
  const userID = decodedToken.id;
  const tweetToBeUpdated = await findOneByID(tweetId);
  if (!tweetToBeUpdated){
    throw new Error('Cannot Find The Tweet!');
  }
  if (tweetToBeUpdated.userID !== userID){
    throw new Error('You Cannot Update This Tweet!');
  }
  const updatedTweet = await updateMessage(tweetId, payload);
  if (updatedTweet[0] === 0){
    throw new Error('Failed To Update Tweet!');
  }
};

exports.deleteTweet = async(payload) => {
  const decodedToken = jwt.decode(payload.token);
  const userID = decodedToken.id;
  const tweetToBeDeleted = await findOneByID(payload.tweetID);
  if (!tweetToBeDeleted){
    throw new Error('Cannot Find The Tweet!');
  }
  if (tweetToBeDeleted.userID !== userID){
    throw new Error('You Cannot Delete This Tweet!');
  }
  const deletedTweet = await deleteTweet(payload.tweetID);
  if (deletedTweet[0] === 0){
    throw new Error('Failed To Delete Tweet!');
  }
};
