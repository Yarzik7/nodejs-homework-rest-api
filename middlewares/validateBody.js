const { generateErrorByType } = require('../helpers');

/**
 * Returns a function for validating request body using a joi schema
 * @param {object} schema
 * @returns {function}
 */
const validateBody = schema => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(generateErrorByType(error));
    }
  
    next();
  };
};

module.exports = validateBody;
