/**
 * Decorator. Returns a wrapper function for error handling 
 * @param {function} controller 
 * @returns {function}
 */
const ctrlWrapper = ctrl => {
  const func = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };

  return func;
};

module.exports = ctrlWrapper;
