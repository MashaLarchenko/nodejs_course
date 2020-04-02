const tasksRepo = require('./task.memory.repository');

const getAll = boardId => tasksRepo.getAll(boardId);

const getTaskById = id => tasksRepo.getTaskById(id);

const createTask = task => tasksRepo.createTask(task);

const updateTask = (id, param) => {
  tasksRepo.updateTask(id, param);
};

const deleteTask = id => {
  tasksRepo.deleteTask(id);
};
module.exports = {
  getAll,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};
