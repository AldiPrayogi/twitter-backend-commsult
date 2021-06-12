const {
  updateOne,
  findOne,
  findAllUsers,
  findOneByUsername,
} = require('../repositories/userRepository');
const bcrypt = require('bcrypt');

exports.fetchOne = async(userID) => {
  const rawFetchedUserData = await findOne(userID);

  if (!rawFetchedUserData){
    throw new Error('User Not Found!');
  }
  if (rawFetchedUserData){
    const {
      dataValues: fetchedUser,
    } = rawFetchedUserData;
    return fetchedUser;
  }
};

exports.fetchAll = async() => {
  const fetchedRawData = await findAllUsers();
  const fetchedUsers = fetchedRawData.map(data => {
    return data.dataValues;
  });

  if (!fetchedUsers){
    throw new Error('No Users Found!');
  }

  return fetchedUsers;
};

exports.updateOne = async(userID, payload) => {

  if (payload.username){
    const checkUser = await findOneByUsername(payload.username);
    if (checkUser){
      throw new Error('Username or Email already taken');
    }
  }

  let newPayload;
  let updatedUser;

  if (payload.password){
    newPayload = {
      ...payload,
      password: bcrypt.hashSync(payload.password, 10),
    };
    updatedUser = await updateOne(userID, newPayload);
  }
  if (!payload.password){
    newPayload = {
      ...payload,
    };
    updatedUser = await updateOne(userID, newPayload);
  }

  if (updatedUser[0] === 0){
    throw new Error(`Cannot update User with UserID=${userID}.`);
  }

  return updatedUser;
};
