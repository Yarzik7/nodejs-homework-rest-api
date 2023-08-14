const { HttpError } = require('./Errors');

/**
 * Sends a response to a request with an id or generates an error
 * @param {object} req
 * @param {object} res
 * @param {function} operation
 */
const operationById = async (req, res, operation, ...args) => {
  const { id } = req.params;
  const result = await operation(id, ...args);
  if (!result) {
    throw new HttpError(404, 'Not found');
  }

  res.json(result);
};

module.exports = operationById;
