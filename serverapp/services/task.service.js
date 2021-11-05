const Task = require('../models/task.model');

class TaskService {
  async create(task) {
    const createdTask = await Task.create(task);

    return createdTask;
  }

  async getAll() {
    const tasks = await Task.find();

    return tasks;
  }

  async getById(id) {
    if (!id) {
      throw new Error('Id не коректен');
    }
    const task = await Task.findById(id);

    return task;
  }

  async update(task) {
    if (!task._id) {
      throw Error('Id не коректен');
    }
    const updatedTask = await Task.findByIdAndUpdate(task._id, task, { new: true });

    return updatedTask;
  }

  async delete(id) {
    if (!id) {
      throw new Error('Id не коректен');
    }
    const task = await Task.findByIdAndDelete(id);

    return task;
  }
}

module.exports = TaskService;
