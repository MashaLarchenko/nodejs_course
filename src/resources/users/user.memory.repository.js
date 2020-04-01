const User = require('./user.model.js');

const UsersData = [
  new User({ id: '1', name: 'Masha', login: 'masha', passwold: '122345n' }),
  new User({ id: '2', name: 'Sasha', login: 'sasha', passwold: '1334s' }),
  new User({ id: '3', name: 'Pasha', login: 'pasha', passwold: '1777p' }),
  new User()
];

const getAll = async () => {
  // TODO: mock implementation. should be replaced during task development
  return UsersData;
};

const getUserById = async id => {
  const us = UsersData.find(user => {
    return user.id === id;
  });
  const { name, login } = us;

  return { id, name, login };
};

const createUser = async (name, login, password) => {
  const newUser = new User({ name, login, password });
  UsersData.push(newUser);
  return newUser;
};

const updateUser = async (id, name, login, password) => {
  const findUser = UsersData.find(user => {
    return user.id === id;
  });
  findUser.name = name;
  findUser.login = login;
  findUser.password = password;
  return findUser;
};

module.exports = { getAll, getUserById, createUser, updateUser };
