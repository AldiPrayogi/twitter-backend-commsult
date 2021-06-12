const {
  registerService,
  signInService,
  verifyToken,
} = require('../services/authService');

exports.signUp = async(req, res) => {
  if (!req.body){
    res.status(400).send({
      message: 'Content cannot be empty!',
    });
  }
  try {
    await registerService(req.body);
    res.send({
      status: 201,
      message: 'Register Successful',
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
    const {
      token,
      id: userID,
      username,
    } = fetchedUser;
    const userData = {
      userID, username,
    };
    res.cookie('token', token, { httpOnly: true });
    res.send({
      userData,
      message: 'Login successful',
    });
  } catch (error){
    res.status(500).send({
      message: error.message,
    });
  }
};

exports.verify = (req, res) => {
  const token = req.cookies.token;
  console.log(token);
  try {
    const isVerified = verifyToken(token);
    res.status(200).send({
      isVerified,
    });
  } catch (error) {
    res.clearCookie('token');
    res.status(404).send({
      message: 'Unauthorized',
    });
  }
};

