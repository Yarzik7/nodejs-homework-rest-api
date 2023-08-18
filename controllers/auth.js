const User = require('../models/user');
const {
  ctrlWrapper,
  Errors: { HttpError },
  processingImgByJimp,
  getVerifyEmail,
} = require('../helpers');
const { sendEmail } = require('../services/usersServices');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const path = require('path');
const fs = require('fs/promises');
const { nanoid } = require('nanoid');
const { SECRET_KEY} = process.env;
const avatarsDir = path.join(__dirname, '../', 'public', 'avatars');

const registerController = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new HttpError(409, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();

  const newUser = await User.create({ ...req.body, password: hashedPassword, avatarURL, verificationToken });

  await sendEmail(getVerifyEmail(email, verificationToken));

  res.status(201).json({ user: { email: newUser.email, subscription: newUser.subscription } });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.verify || !bcrypt.compare(password, user.password)) {
    throw new HttpError(401, 'Email or password is wrong or email is not verified.');
  }

  const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '23h' });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({ token, user: { email, password } });
};

const getCurrentController = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

const logoutController = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: '' });

  res.status(204).json();
};

const updateSubscriptionController = async (req, res) => {
  res.json(await User.findByIdAndUpdate(req.user._id, req.body, { new: true }));
};

const updateAvatarController = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);

  await processingImgByJimp(tempUpload, resultUpload);

  await fs.unlink(tempUpload);

  const avatarURL = path.join('avatars', filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({ avatarURL });
};

const verifyEmailController = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw new HttpError(404, 'User not found');
  }

  await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: null });

  res.json({ message: 'Verification successful' });
};

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new HttpError(404, 'Email not found');
  }
  if (user.verify) {
    throw new HttpError(400, 'Verification has already been passed');
  }

  await sendEmail(getVerifyEmail(email, user.verificationToken));

  res.status(201).json({ message: 'Verify email send success' });
};

module.exports = {
  registerController: ctrlWrapper(registerController),
  loginController: ctrlWrapper(loginController),
  getCurrentController: ctrlWrapper(getCurrentController),
  logoutController: ctrlWrapper(logoutController),
  updateSubscriptionController: ctrlWrapper(updateSubscriptionController),
  updateAvatarController: ctrlWrapper(updateAvatarController),
  verifyEmailController: ctrlWrapper(verifyEmailController),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
};
