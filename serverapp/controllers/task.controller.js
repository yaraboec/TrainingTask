const { validationResult } = require('express-validator');
const jwtDecode = require('jwt-decode');

const ForbiddenException = require('../errors/forbidden.error');
const NotFoundException = require('../errors/not.found.error');
const UnauthorizedException = require('../errors/unauthorized.error');
const AuthValidation = require('../services/auth.validation.service');
const TaskService = require('../services/task.service');

const taskService = new TaskService();

const getToken = (req) => {
  const token = req.headers.authorization;

  if (token) {
    return token.substring(7, token.length);
  }

  return token;
};

class TaskController {
  async create(req, res, next) {
    const token = getToken(req);

    const tokenValidationResult = AuthValidation.unauthorizedValidation(token);

    if (tokenValidationResult !== 200) {
      return next(new UnauthorizedException('Unauthorized'));
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const task = await taskService.create(req.body);

    return res.json(task);
  }

  async getAll(req, res, next) {
    const token = getToken(req);

    const validationAuthorizedResult = AuthValidation.unauthorizedValidation(token);

    if (validationAuthorizedResult !== 200) {
      return next(new UnauthorizedException('Unauthorized'));
    }

    const decodedToken = jwtDecode(token);

    const tasks = await taskService.getAll(decodedToken.id);

    return res.json(tasks);
  }

  async getById(req, res, next) {
    const token = getToken(req);

    const tokenValidationResult = AuthValidation.unauthorizedValidation(token);

    if (tokenValidationResult !== 200) {
      return next(new UnauthorizedException('Unauthorized'));
    }

    const gotTask = await taskService.getById(req.params.id);

    const validationForbiddenResult = AuthValidation.forbiddenValidation(token, gotTask);

    if (validationForbiddenResult !== 200) {
      return next(new ForbiddenException('Forbidden'));
    }

    if (!gotTask) {
      return next(new NotFoundException('No task found with that ID', 404));
    }

    return res.status(200).json(gotTask);
  }

  async update(req, res, next) {
    const token = getToken(req);

    const tokenValidationResult = AuthValidation.unauthorizedValidation(token);

    if (tokenValidationResult !== 200) {
      return next(new UnauthorizedException('Unauthorized'));
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const validationTask = await taskService.getById(req.params.id);

    const validationForbiddenResult = AuthValidation.forbiddenValidation(token, validationTask);

    if (validationForbiddenResult !== 200) {
      return next(new ForbiddenException('Forbidden'));
    }

    const updatedTask = await taskService.update(req.body);

    if (!updatedTask) {
      return next(new NotFoundException('No task found with that ID', 404));
    }

    return res.status(200).json(updatedTask);
  }

  async delete(req, res, next) {
    const token = getToken(req);

    const tokenValidationResult = AuthValidation.unauthorizedValidation(token);

    if (tokenValidationResult !== 200) {
      return next(new UnauthorizedException('Unauthorized'));
    }

    const validationTask = await taskService.getById(req.params.id);

    const validationForbiddenResult = AuthValidation.forbiddenValidation(token, validationTask);

    if (validationForbiddenResult !== 200) {
      return next(new ForbiddenException('Forbidden'));
    }

    const deletedTask = await taskService.delete(req.params.id);

    if (!deletedTask) {
      return next(new NotFoundException('No task found with that ID', 404));
    }

    return res.status(200).json(deletedTask._id);
  }
}

module.exports = TaskController;
