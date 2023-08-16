const User = require('../models/user');
const {
  ctrlWrapper,
  Errors: { HttpError },
} = require('../helpers');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

const registerController = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new HttpError(409, 'Email already in use');
  }

  const hashPass = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPass });
  res.json({ name: newUser.name, email: newUser.email });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new HttpError(401, 'Email or password invalid');
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw new HttpError(401, 'Email or password invalid');
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });

  res.json({ token });
};

module.exports = {
  registerController: ctrlWrapper(registerController),
  loginController: ctrlWrapper(loginController),
};
