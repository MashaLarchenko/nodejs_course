const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards.map(Board.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const board = await boardsService.getBoardById(id);
  if (board !== undefined) {
    res.json(Board.toResponse(board));
  } else {
    res.status(404).end();
  }
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
  console.log(board, 'board del');
  if (board !== undefined) {
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

module.exports = router;
