const Task = require('../models/task.model');

class TaskService {
  async create(task) {
    const createdTask = await Task.create(task);

    return createdTask;
  }

  async getAll(idUser) {
    const tasks = await Task.find({ holder: idUser });

    return tasks;
  }

  async getById(id) {
    const task = await Task.findById(id);

    return task;
  }

  async update(task) {
    const updatedTask = await Task.findByIdAndUpdate(task._id, task, { new: true });

    return updatedTask;
  }

  async delete(id) {
    const deletedTask = await Task.findByIdAndDelete(id);

    return deletedTask;
  }
}

module.exports = TaskService;
