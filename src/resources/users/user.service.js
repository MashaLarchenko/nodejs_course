const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const getUserById = id => usersRepo.getUserById(id);

const createUser = (name, login, password) =>
  usersRepo.createUser(name, login, password);

const updateUser = (id, name, login, password) => {
  usersRepo.updateUser(id, name, login, password);
};
module.exports = { getAll, getUserById, createUser, updateUser };
