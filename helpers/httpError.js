/**
 * Creates and returns an error object
 * @param {number} status
 * @param {string} message
 * @returns {object} error
 */
const httpError = (status, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = httpError;
