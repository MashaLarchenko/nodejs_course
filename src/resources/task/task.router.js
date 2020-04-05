const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/:boardId/tasks').get(async (req, res) => {
  const { boardId } = req.params;
  const tasks = await tasksService.getAll(boardId);
  res.json(tasks);
});

router.route('/:boardId/tasks/:id').get(async (req, res) => {
  const { boardId, id } = req.params;
  const task = await tasksService.getTaskById(id, boardId);
  if (task !== undefined) {
    res.json(task);
  } else {
    res.status(404).end();
  }
});

router.route('/:boardId/tasks').post(async (req, res) => {
  const { boardId } = req.params;
  const task = await tasksService.createTask(
    Task.fromRequest(boardId, req.body)
  );
  res.json(task);
});

router.route('/:boardId/tasks/:id').put(async (req, res) => {
  const { id } = req.params;
  const task = await tasksService.updateTask(id, req.body);
  res.json(task);
});

router.route('/:boardId/tasks/:id').delete(async (req, res) => {
  const { id, boardId } = req.params;
  const task = await tasksService.deleteTask(id, boardId);
  if (task !== undefined) {
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

module.exports = router;
