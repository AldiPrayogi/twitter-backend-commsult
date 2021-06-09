const {
  registerService,
  signInService,
} = require('../services/authService');

exports.signUp = async(req, res) => {
  if (!req.body){
    res.status(400).send({
      message: 'Content cannot be empty!',
    });
  }
  try {
    const createdUser = await registerService(req.body);
    res.send({
      status: 200,
      createdUser: createdUser,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

exports.signIn = async(req, res) => {
  if (!req.body){
    res.status(500).send({
      message: 'Content cannot be empty!',
    });
  }
  try {
    const fetchedUser = await signInService(req.body);
    res.send({
      status: 200,
      loggedInUser: fetchedUser,
    });
  } catch (error){
    res.status(500).send({
      message: error.message,
    });
  }

};

