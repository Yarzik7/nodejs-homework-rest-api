const { isValidObjectId } = require('mongoose');
const {
  Errors: { HttpError },
} = require('../helpers');

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    next(new HttpError(422, `${id} is not valid id`));
  }

  next();
};

module.exports = isValidId;
