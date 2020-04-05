const uuid = require('uuid');

class Task {
  constructor({
    id = uuid(),
    title = 'Task',
    order = '0',
    description = 'task',
    userId = 'null',
    boardId = '1',
    columnId = '1'
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(board) {
    // const { id, title, order, description, userId, boardId, columnId } = board;
    return board;
  }

  static fromRequest(boardId, json) {
    const { title, order, description, userId, columnId } = json;
    const user = new Task({
      title,
      order,
      description,
      userId,
      boardId,
      columnId
    });
    return user;
  }
}

module.exports = Task;
