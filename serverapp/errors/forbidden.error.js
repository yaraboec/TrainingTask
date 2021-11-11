class ForbiddenException extends Error {
  constructor(message) {
    super(message);

    this.statusCode = 403;

    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ForbiddenException;
