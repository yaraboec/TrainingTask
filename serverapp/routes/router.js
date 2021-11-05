const express = require('express');

const TaskController = require('../controllers/task.controller');

const taskController = new TaskController();

const router = express.Router();

const catchAsync = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};

router.post('/tasks', catchAsync(taskController.create));
router.get('/tasks', catchAsync(taskController.getAll));
router.get('/tasks/:id', catchAsync(taskController.getById));
router.put('/tasks', catchAsync(taskController.update));
router.delete('/tasks/:id', catchAsync(taskController.delete));

module.exports = router;
