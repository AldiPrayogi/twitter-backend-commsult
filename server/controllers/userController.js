const {
  updateOne,
  fetchOne,
  fetchAll,
} = require('../services/userService');

exports.find = async(req, res) => {
  try {
    const fetchedUser = await fetchOne(req.params.userID);
    res.send({
      status: 200,
      fetchedUser: fetchedUser,
    });
  } catch (error){
    res.status(500).send({
      message: error.message,
    });
  }
};

exports.findAll = async(req, res) => {
  try {
    const fetchedUsers = await fetchAll();
    res.send({
      status: 200,
      fetchedUsers: fetchedUsers,
    });
  } catch (error){
    res.status(500).send({message: error.message});
  }
};

exports.update = async(req, res) => {
  try {
    const updatedUser = await updateOne(req.params.userID, req.body);
    res.send({
      status: 200,
      updatedUser: updatedUser,
    });
  } catch (error){
    res.status(500).send({
      message: error.message,
    });
  }
};

