const db = require('../models');
const User = db.users;

exports.createUser = async(payload) => {
  return User.create(payload);
};

exports.findOne = async(userID) => {
  return User.findByPk(userID);
};

exports.findOneByEmail = async(userEmail) => {
  return User.findOne({where: {email: userEmail}});
};

exports.findAllUsers = async() => {
  return User.findAll();
};

exports.updateOne = async(userID, payload) => {
  return User.update(payload, {
    where: {userID: userID},
  });
};
