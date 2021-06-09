const {
  updateOne,
  findOne,
  findAllUsers,
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

  console.log(fetchedRawData[0]);
  const fetchedUsers = fetchedRawData.map(data => {
    return data.dataValues;
  });

  console.log(fetchedUsers);

  if (!fetchedUsers){
    throw new Error('No Users Found!');
  }

  return fetchedUsers;
};

exports.updateOne = async(userID, payload) => {
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
