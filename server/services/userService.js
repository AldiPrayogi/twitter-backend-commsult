const {
  createUser,
  updateOne,
  findOne,
  findOneByEmail,
  findAllUsers,
} = require('../repositories/userRepository');
const bcrypt = require('bcrypt');

exports.createUser = async(payload) => {
  const {
    email: userEmail,
  } = payload;

  const fetchedUser = await findOneByEmail(userEmail);
  if (fetchedUser){
    throw new Error('User email is taken!');
  }

  const newUserPayload = {
    ...payload,
  };

  const {
    dataValues: createdUser,
  } = await createUser(newUserPayload);

  if (!createdUser) {
    throw new Error('Failed to Create New User');
  }

  return createdUser;
};

exports.fetchOne = async(userID) => {
  const {
    dataValues: fetchedUser,
  } = await findOne(userID);

  if (!fetchedUser){
    throw new Error('User Not Found!');
  }

  return fetchedUser;
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
    console.log(newPayload);
    updatedUser = await updateOne(userID, newPayload);
  }
  if (!payload.password){
    newPayload = {
      ...payload,
    };
    updatedUser = updateOne(userID, newPayload);
  }

  if (updatedUser[0] === 0){
    throw new Error(`Cannot update User with UserID=${userID}.`);
  }

  return updatedUser;
};
