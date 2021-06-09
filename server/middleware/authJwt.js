const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

const checkIfTokenIsProvided = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token){
    return res.status(403).send({
      message: 'No Token Provided!',
    });
  }
  next();
};

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];

  jwt.verify(token, config.secret, (error, decoded) => {
    if (error){
      return res.status(401).send({
        message: 'Unauthorized',
      });
    }
    req.ID = decoded.id;
    req.username = decoded.username;
    next();
  });
};

const verifyIfUserIsValid = (req, res, next) => {
  const token = req.headers['x-access-token'];

  console.log(req.params.userID);
  jwt.verify(token, config.secret, (error, decoded) => {
    if (req.params.userID !== decoded.id || error){
      return res.status(401).send({
        message: 'You Cannot Edit This Information',
      });
    }
    next();
  });
};

const authJwt = {
  verifyToken,
  checkIfTokenIsProvided,
  verifyIfUserIsValid,
};

module.exports = authJwt;
