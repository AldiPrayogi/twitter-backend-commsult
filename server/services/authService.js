const {
  createUser,
  findOneByEmailOrUsername,
  findOneByEmail,
} = require('../repositories/userRepository');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const bcrypt = require('bcrypt');

exports.registerService = async(payload) => {
  const {
    email: userEmail,
    username,
  } = payload;

  const fetchedUser = await findOneByEmailOrUsername(userEmail, username);
  if (fetchedUser){
    throw new Error('Email or Username Is Taken!');
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

exports.signInService = async(payload) => {
  const {
    email,
  } = payload;
  const fetchedRawData = await findOneByEmail(email);

  if (!fetchedRawData){
    throw new Error('Username or Password Does Not Match');
  }

  const {
    dataValues: fetchedUser,
  } = fetchedRawData;

  const isPasswordValid = bcrypt.compareSync(
    payload.password,
    fetchedUser.password,
  );

  if (!isPasswordValid) {
    throw new Error('Username or Password Does Not Match');
  }

  const token = jwt.sign({
    id: fetchedUser.ID,
    username: fetchedUser.username,
  }, config.secret, {
    expiresIn: '1d',
  });

  return {
    id: fetchedUser.ID,
    username: fetchedUser.username,
    token: token,
  };
};

exports.verifyToken = (token) => {
  return jwt.verify(token, config.secret, (error, decoded) => {
    if (error) {
      throw new Error(error);
    }
    return decoded;
  });
};

