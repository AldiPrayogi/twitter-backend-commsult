const dbConfig = require('../config/db.config.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./User.js')(sequelize, Sequelize);
db.tweets = require('./Tweet')(sequelize, Sequelize);

db.users.hasMany(db.tweets, {as: 'tweets'});
db.tweets.belongsTo(db.users, {
  foreignKey: 'tweetID',
  as: 'tweet',
});
module.exports = db;
