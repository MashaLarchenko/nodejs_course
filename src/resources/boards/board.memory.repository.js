const Board = require('./board.model.js');

const BoardsData = [
  new Board({ id: '1', title: 'Board1', columns: 'column1' }),
  new Board({ id: '2', title: 'Board2', columns: 'column2' }),
  new Board({ id: '3', title: 'Board3', columns: 'column3' }),
  new Board()
];

const findById = id => {
  return BoardsData.find(user => {
    return user.id === id;
  });
};

const getAll = async () => {
  return BoardsData;
};

const getBoardById = async id => {
  const board = findById(id);
  return board;
};

const createBoard = async newBoard => {
  BoardsData.push(newBoard);
  return newBoard;
};

const updateBoard = async (id, { title, columns }) => {
  const findUser = findById(id);
  findUser.title = title;
  findUser.columns = columns;
  return findUser;
};

const deleteBoard = async id => {
  const deletedBoard = findById(id);
  const index = BoardsData.indexOf(deletedBoard);
  BoardsData.splice(index, 1);
  return BoardsData;
};

module.exports = {
  getAll,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard
};
