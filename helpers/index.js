const Errors = require('./Errors');
const ctrlWrapper = require('./ctrlWrapper');
const operationById = require('./operationById');
const handleMongooseError = require('./handleMongooseError');
const processingImgByJimp = require('./processingImgByJimp')
const getVerifyEmail = require('./getVerifyEmail')

module.exports = {
  Errors,
  ctrlWrapper,
  operationById,
  handleMongooseError,
  processingImgByJimp,
  getVerifyEmail
};
