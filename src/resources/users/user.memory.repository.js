const User = require('./user.model.js');

const UsersData = [
  new User({ id: '1', name: 'Masha', login: 'masha', passwold: '122345n' }),
  new User({ id: '2', name: 'Sasha', login: 'sasha', passwold: '1334s' }),
  new User({ id: '3', name: 'Pasha', login: 'pasha', passwold: '1777p' }),
  new User()
];

const findById = id => {
  return UsersData.find(user => {
    return user.id === id;
  });
};

const getAll = async () => {
  // TODO: mock implementation. should be replaced during task development
  return UsersData;
};

const getUserById = async id => {
  const us = findById(id);
  const { name, login } = us;

  return { id, name, login };
};

const createUser = async newUser => {
  UsersData.push(newUser);
  return newUser;
};

const updateUser = async (id, { name, login, password }) => {
  const findUser = findById(id);
  findUser.name = name;
  findUser.login = login;
  findUser.password = password;
  return findUser;
};

const deleteUser = async id => {
  const deletedUser = findById(id);
  const index = UsersData.indexOf(deletedUser);
  UsersData.splice(index, 1);
  return UsersData;
};

module.exports = { getAll, getUserById, createUser, updateUser, deleteUser };
