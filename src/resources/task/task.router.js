const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/:boardId/tasks').get(async (req, res) => {
  const { boardId } = req.params;
  const tasks = await tasksService.getAll(boardId);
  res.json(tasks);
});

router.route('/:boardId/tasks/:id').get(async (req, res) => {
  const { id } = req.params;
  const tasks = await tasksService.getTaskById(id);

  res.json(Task.toResponse(tasks));
});

router.route('/:boardId/tasks').post(async (req, res) => {
  const { boardId } = req.params;
  const task = await tasksService.createTask(
    Task.fromRequest(boardId, req.body)
  );
  res.json(Task.toResponse(task));
});

router.route('/:boardId/tasks/:id').put(async (req, res) => {
  const { id } = req.params;
  const task = await tasksService.updateTask(id, req.body);
  res.json(task);
});

router.route('/:boardId/tasks/:id').delete(async (req, res) => {
  const { id } = req.params;
  const task = await tasksService.deleteTask(id);
  res.json(task);
});

module.exports = router;
