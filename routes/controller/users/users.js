const { Users } = require("../../../models/user.models");
const bcrypt = require("bcryptjs");
const { promisify } = require("util");
const comparePassword = promisify(bcrypt.compare);

const createUser = async (req, res, next) => {
  try {
    let user = await Users.findOne({ Email: req.body.Email });
    // if (user) {
    //   return res.status(400).json({ message: "Email is existed" });
    // }

    let newUser = await Users.create(req.body);
    return res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res, next) => {
  try {
    let users = await Users.find();
    return res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res, next) => {
  try {
    let { userId } = req.params;
    let user = await Users.findOne({ _id: userId });
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUserByAdmin = async (req, res, next) => {
  try {
    let { userId } = req.params;
    Users.findOne({ _id: userId })
      .then((user) => {
        Object.keys(req.body).map((key) => {
          return (user[key] = req.body[key]);
        });
        return user.save();
      })
      .then((user) => res.status(200).json(user));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUserByClient = async (req, res, next) => {
  try {
    let user = req.user;
    Users.findOne({ Email: user.Email })
      .then((user) => {
        Object.keys(req.body).map((key) => {
          return (user[key] = req.body[key]);
        });
        return user.save();
      })
      .then((user) => res.status(200).json(user));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteById = async (req, res, next) => {
  try {
    let { userId } = req.params;
    await Users.deleteOne({ _id: userId });
    return res.status(204).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// updatePassword,
const updatePassword = async (req, res, next) => {
  try {
    let { password, newPassword } = req.body;
    let { Email } = req.user;
    let user = await Users.findOne({ Email });
    let isMatch = comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password is incorrect!" });
    }
    user.password = newPassword;
    user.save().then((user) => {
      return res.status(200).json(user);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// resetPassword => ngau nhien
module.exports = {
  createUser,
  getUser,
  getUserById,
  updateUserByAdmin,
  updateUserByClient,
  deleteById,
  updatePassword
};
