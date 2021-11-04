const TaskService = require('../services/task.service');

const taskService = new TaskService();

class TaskController {
  async create(req, res) {
    try {
      const task = await taskService.create(req.body);
      res.json(task);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async getAll(req, res) {
    try {
      const tasks = await taskService.getAll();

      return res.json(tasks);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async getById(req, res) {
    try {
      const task = await taskService.getById(req.params.id);

      return res.json(task);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async update(req, res) {
    try {
      const updatedTask = await taskService.update(req.body, res);

      return res.json(updatedTask);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async delete(req, res) {
    try {
      const task = await taskService.delete(req.params.id);

      return res.json(task);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = new TaskController();
