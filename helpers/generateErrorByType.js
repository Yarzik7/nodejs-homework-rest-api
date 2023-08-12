const {FieldRequiredError, ValidationError} = require('./Errors')

const generateErrorByType = (error) => {
  const { type, path, message } = error.details[0];
  switch (type) {
    case 'any.required':
      return new FieldRequiredError(path[0]);
    default:
      return new ValidationError(message);
  }
}

module.exports = generateErrorByType;