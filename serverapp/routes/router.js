const express = require('express');

const taskController = require('../controllers/task.controller');

const router = express.Router();

router.post('/tasks', taskController.create);
router.get('/tasks', taskController.getAll);
router.get('/tasks/:id', taskController.getById);
router.put('/tasks', taskController.update);
router.delete('/tasks/:id', taskController.delete);

module.exports = router;
