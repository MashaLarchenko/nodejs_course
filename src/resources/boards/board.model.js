const uuid = require('uuid');

class Board {
  constructor({ id = uuid(), title = 'BOARD', columns = 'columns' } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static toResponse(board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }

  static fromRequest(json) {
    const { title, columns } = json;
    const user = new Board({ title, columns });
    return user;
  }
}

module.exports = Board;
