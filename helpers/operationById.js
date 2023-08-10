const httpError = require('./httpError');

/**
 * Sends a response to a request with an id or generates an error
 * @param {object} req 
 * @param {object} res 
 * @param {function} operation 
 */
const operationById = async (req, res, operation) => {
  const { id } = req.params;
  const result = await operation(id, req.body);
  
  if (!result) {
    throw httpError(404, 'Not found');
  }

  res.json(result);
};

module.exports = operationById;
