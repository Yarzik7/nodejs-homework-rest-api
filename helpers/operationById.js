const httpError = require('./httpError');

const operationById = async (req, res, operation) => {
  const { id } = req.params;
  const result = await operation(id, req.body);
  if (!result) {
    throw httpError(404, 'Not found');
  }

  res.json(result);
};

module.exports = operationById;
