const express = require('express');

const TaskController = require('../controllers/task.controller');

const router = express.Router();

router.post('/tasks', TaskController.create);
router.get('/tasks', TaskController.getAll);
router.get('/tasks/:id', TaskController.getById);
router.put('/tasks', TaskController.update);
router.delete('/tasks/:id', TaskController.delete);

module.exports = router;
