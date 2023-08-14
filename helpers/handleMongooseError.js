const handleMongooseError = (error, data, next) => {
  error.status = 422;
  next();
};

module.exports = handleMongooseError;
