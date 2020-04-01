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

  res.json(User.toResponse(users));
});

router.route('/').post(async (req, res) => {
  const user = await usersService.createUser(User.fromRequest(req.body));
  res.json(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const user = await usersService.updateUser(id, req.body);
  res.json(user);
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  const users = await usersService.deleteUser(id);
  res.json(users);
});

module.exports = router;
