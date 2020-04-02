const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards.map(Board.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const boards = await boardsService.getBoardById(id);
  res.json(Board.toResponse(boards));
});

router.route('/').post(async (req, res) => {
  const board = await boardsService.createBoard(Board.fromRequest(req.body));
  res.json(Board.toResponse(board));
});

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const board = await boardsService.updateBoard(id, req.body);
  res.json(board);
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  const board = await boardsService.deleteBoard(id);
  res.json(board);
});

module.exports = router;
