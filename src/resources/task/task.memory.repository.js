const Task = require('./task.model.js');

const TasksData = [
  new Task({
    id: '1',
    title: 'Task1',
    order: '0',
    description: 'task1',
    userId: '1',
    boardId: '1',
    columnId: '1'
  }),
  new Task({
    id: '2',
    title: 'Task2',
    order: '1',
    description: 'task2',
    userId: '2',
    boardId: '2',
    columnId: '2'
  }),
  new Task({
    id: '3',
    title: 'Task3',
    order: '2',
    description: 'task3',
    userId: '3',
    boardId: '3',
    columnId: '3'
  }),
  new Task()
];

const findById = id => {
  return TasksData.find(task => {
    return task.id === id;
  });
};

const findByBoardId = boardId => {
  return TasksData.filter(task => {
    return task.boardId === boardId;
  });
};

const getAll = async boardId => {
  console.log(findByBoardId(boardId));
  return findByBoardId(boardId);
};

const getTaskById = async id => {
  const task = findById(id);
  return task;
};

const createTask = async newTask => {
  TasksData.push(newTask);
  return newTask;
};

const updateTask = async (
  id,
  { title, order, description, userId, boardId, columnId }
) => {
  const findUser = findById(id);
  findUser.title = title;
  findUser.order = order;
  findUser.description = description;
  findUser.userId = userId;
  findUser.boardId = boardId;
  findUser.columnId = columnId;

  return findUser;
};

const deleteTask = async id => {
  const deletedTask = findById(id);
  const index = TasksData.indexOf(deletedTask);
  TasksData.splice(index, 1);
  return TasksData;
};

module.exports = {
  getAll,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};
