const db = require('../models');
const User = db.users;
const {Op} = require('sequelize');

exports.createUser = async(payload) => {
  return User.create(payload);
};

exports.findOne = async(userID) => {
  return User.findByPk(userID);
};

exports.findOneByEmailOrUsername = async(userEmail, username) => {
  return User.findOne({where: {
    [Op.or]: [
      {email: userEmail},
      {username: username},
    ],
  }});
};

exports.findOneByEmail = async(email) => {
  return User.findOne({where: {email: email}});
};

exports.findOneByUsername = async(username) => {
  return User.findOne({where: {username: username}});
};

exports.findAllUsers = async() => {
  return User.findAll();
};

exports.updateOne = async(userID, payload) => {
  return User.update(payload, {
    where: {ID: userID},
  });
};
