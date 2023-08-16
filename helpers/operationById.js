const { HttpError } = require('./Errors');

/**
 * Returns a response to a request with an id or generates an error
 * @param {object} req
 * @param {function} operation
 * @param {...any} any other arguments
 */
const operationById = async (req, operation, ...args) => {
  const { id } = req.params;
  const result = await operation(id, ...args);
  if (!result) {
    throw new HttpError(404, 'Not found');
  }

  return result;
};

module.exports = operationById;
