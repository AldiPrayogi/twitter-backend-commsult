const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Tweet', {
    ID: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
    },
    message: {
      type: DataTypes.STRING(240),
    },
  });
};
