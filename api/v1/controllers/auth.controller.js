const { ValidationError } = require("sequelize");
const jwt = require("jsonwebtoken");
const UserService = require("../services/user.service");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserService.getUserByEmail(email);
    if (!user) {
      return res
        .status(200)
        .json({ success: false, msg: "E-mail or password incorrect" });
    }
    if (!user.checkPassword(password, user.password)) {
      return res
        .status(200)
        .json({ success: false, msg: "E-mail or password incorrect" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    return res.status(200).json({ success: true, token });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({
        success: false,
        error: {
          name: error.name,
          msg: error.errors[0].message,
        },
      });
    }
    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    await UserService.createUser({ email, password });
    return res.status(200).json({ success: true, msg: "User created" });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({
        success: false,
        error: {
          name: error.name,
          msg: error.errors[0].message,
        },
      });
    }
    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  login,
  signup,
};
