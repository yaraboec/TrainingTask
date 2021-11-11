const { validationResult } = require('express-validator');
const jwtDecode = require('jwt-decode');

const NotFoundException = require('../errors/not.found.error');
const TaskService = require('../services/task.service');

const taskService = new TaskService();

const getToken = (req) => {
  const token = req.headers.authorization.substring(7, req.headers.authorization.length);

  return token;
};

class TaskController {
  async create(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(getToken(req));

    const task = await taskService.create(req.body);

    return res.json(task);
  }

  async getAll(req, res) {
    const token = getToken(req);
    const decodedToken = jwtDecode(token);
    const tasks = await taskService.getAll(decodedToken.id);

    return res.json(tasks);
  }

  async getById(req, res, next) {
    const gotTask = await taskService.getById(req.params.id);

    if (!gotTask) {
      return next(new NotFoundException('No task found with that ID', 404));
    }

    return res.status(200).json(gotTask);
  }

  async update(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const updatedTask = await taskService.update(req.body);

    if (!updatedTask) {
      return next(new NotFoundException('No task found with that ID', 404));
    }

    return res.status(200).json(updatedTask);
  }

  async delete(req, res, next) {
    const deletedTask = await taskService.delete(req.params.id);

    if (!deletedTask) {
      return next(new NotFoundException('No task found with that ID', 404));
    }
    return res.status(200).json(deletedTask._id);
  }
}

module.exports = TaskController;
