const TaskService = require('../services/taskService');

class TaskController {
  async create(req, res) {
    try {
      const task = await TaskService.create(req.body);
      res.json(task);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async getAll(req, res) {
    try {
      const tasks = await TaskService.getAll();
      return res.json(tasks);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async getById(req, res) {
    try {
      const task = await TaskService.getById(req.params.id);
      return res.json(task);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async update(req, res) {
    try {
      const updatedTask = await TaskService.update(req.body);
      return res.json(updatedTask);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async delete(req, res) {
    try {
      const task = await TaskService.delete(req.params.id);
      return res.json(task);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = new TaskController();
