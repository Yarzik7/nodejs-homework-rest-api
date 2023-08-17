const handleMongooseError = (error, data, next) => {
  const { name, code } = error;
  const status = name === 'MongoServerError' && code === 11000 ? 409 : 422;
  
  error.status = status;
  next();
};

module.exports = handleMongooseError;
