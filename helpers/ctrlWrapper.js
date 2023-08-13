/**
 * Decorator. Returns a wrapper function for error handling 
 * @param {function} controller 
 * @returns {function}
 */
const ctrlWrapper = ctrl => {
  return async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = ctrlWrapper;
