const Errors = require('./Errors');
const generateErrorByType = require('./generateErrorByType')
const ctrlWrapper = require('./ctrlWrapper');
const operationById = require('./operationById');

module.exports = {
  Errors,
  generateErrorByType,
  ctrlWrapper,
  operationById,
};
