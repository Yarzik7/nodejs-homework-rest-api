class MyError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    this.name = this.constructor.name;
  }
}

class HttpError extends MyError { }

module.exports = { HttpError};
