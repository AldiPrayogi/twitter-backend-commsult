const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const Tweet = sequelize.define('Tweet', {
    ID: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    message: {
      type: DataTypes.STRING(240),
    },
  });

  return Tweet;
};
