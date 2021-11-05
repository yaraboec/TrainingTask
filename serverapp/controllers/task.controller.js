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

  async getById(req, res) {
    const task = await taskService.getById(req.params.id);

    return res.json(task);
  }

  async update(req, res, next) {
    const updatedTask = await taskService.update(req.body);

    if (!updatedTask) {
      const error = new NotFoundException('No task found with that ID', 404);

      next(error);
    }

    return res.status(202).json({
      status: 'success',
      data: { updatedTask },
    });
  }

  async delete(req, res) {
    const task = await taskService.delete(req.params.id);

    return res.json(task);
  }
}

module.exports = TaskController;
