const express = require('express');

const TaskController = require('../controllers/task.controller');

const taskController = new TaskController();

const router = express.Router();

const catchAsync = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};

router.post('/tasks', taskController.create);
router.get('/tasks', taskController.getAll);
router.get('/tasks/:id', taskController.getById);
router.put('/tasks', catchAsync(async (req, res, next) => {
  taskController.update(req, res, next);
}));
router.delete('/tasks/:id', taskController.delete);

module.exports = router;
