const UserModel = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res
        .status(409)
        .send({ message: "User already exists", success: false });
    }
    const newUser = new UserModel({ name, email, password });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    newUser.password = hashedPassword;
    await newUser.save();
    res
      .status(201)
      .send({ message: "User created successfully", success: true });
  } catch (err) {
    return res.status(500).send({
      message: "authController: signup Internal server error",
      success: false,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .send({ message: "User not found", success: false });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(401)
        .send({ message: "Invalid password", success: false });
    }
    const jwtToken = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    return res.status(200).send({
      message: "Login Successfully",
      success: true,
      jwtToken,
      email,
      name: user.name,
    });
  } catch (err) {
    return res.status(500).send({
      message: "authController: login Internal server error",
      success: false,
    });
  }
};

module.exports = { signup, login };
