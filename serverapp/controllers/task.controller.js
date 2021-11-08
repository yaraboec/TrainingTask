const NotFoundException = require('../errors/not.found.error');
const TaskService = require('../services/task.service');

const taskService = new TaskService();

class TaskController {
  async create(req, res) {
    const task = await taskService.create(req.body);

    return res.json(task);
  }

  async getAll(req, res) {
    const tasks = await taskService.getAll();

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
