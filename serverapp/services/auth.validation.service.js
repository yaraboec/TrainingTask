const StatusCodes = require('http-status-codes');
const jwtDecode = require('jwt-decode');

const unauthorizedValidation = (token) => {
  if (!token) {
    return StatusCodes.UNAUTHORIZED;
  }

  return StatusCodes.OK;
};

const forbiddenValidation = (token, task) => {
  const decodedToken = jwtDecode(token);

  if (decodedToken.id !== JSON.stringify(task.holder).slice(1, -1)) {
    return StatusCodes.FORBIDDEN;
  }

  return StatusCodes.OK;
};

module.exports = {
  unauthorizedValidation,
  forbiddenValidation,
};
