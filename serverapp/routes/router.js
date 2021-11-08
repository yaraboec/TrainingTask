const express = require('express');
const { body } = require('express-validator');

const TaskController = require('../controllers/task.controller');

const taskController = new TaskController();

const router = express.Router();

const catchAsync = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};

router.post('/tasks',
  body('name').isLength({ min: 5 }),
  body('status').isBoolean(),
  catchAsync(taskController.create));
router.get('/tasks', catchAsync(taskController.getAll));
router.get('/tasks/:id', catchAsync(taskController.getById));
router.put('/tasks',
  body('name').isLength({ min: 5 }),
  body('status').isBoolean(),
  body('_id').notEmpty(),
  catchAsync(taskController.update));
router.delete('/tasks/:id', catchAsync(taskController.delete));

module.exports = router;
