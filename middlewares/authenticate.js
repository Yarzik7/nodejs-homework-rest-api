const jwt = require('jsonwebtoken');
const {
  Errors: { HttpError },
} = require('../helpers');
const User = require('../models/user');
const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers; // +
  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer') {
    next(new HttpError(401, 'Unauthorized'));
  }

  try {
    const { id: _id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findOne({ _id });
    if (!user || !user.token || user.token !== token) {
      next(new HttpError(401, 'Not authorized'));
    }
    req.user = user;
    next();
  } catch {
    next(new HttpError(401, 'Not authorized'));
  }
};

module.exports = authenticate;
