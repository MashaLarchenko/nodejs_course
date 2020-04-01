const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const users = await usersService.getUserById(id);

  res.json(users);
});

router.route('/').post(async (req, res) => {
  const { name, login, password } = req.body;
  const user = await usersService.createUser(name, login, password);
  res.json(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const { name, login, password } = req.body;
  const user = await usersService.updateUser(id, name, login, password);
  res.json(user);
});

module.exports = router;
