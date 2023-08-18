const validateBody = require('./validateBody');
const isValidId = require('./isValidId');
const authenticate = require('./authenticate');
const upload = require('./upload');
const processingImgByJimp = require('./processingImgByJimp')

module.exports = {
  validateBody,
  isValidId,
  authenticate,
  upload,
  processingImgByJimp,
};
