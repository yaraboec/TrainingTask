class UnauthorizedException extends Error {
  constructor(message) {
    super(message);

    this.statusCode = 401;

    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = UnauthorizedException;
