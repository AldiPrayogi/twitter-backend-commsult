const { DataTypes } = require('sequelize');
const { v4 } = require('uuid');
const bcrypt = require('bcrypt');

module.exports = (sequelize, Sequelize) => {
  return sequelize.define('User', {
    ID: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  }, {
    hooks: {
      beforeCreate: (user) => {
        user.password = bcrypt.hashSync(user.password, 10);
        user.ID = v4();
      },
    },
  });
};
