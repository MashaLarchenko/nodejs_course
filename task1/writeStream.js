const fs = require('fs');
const getAbsolutePathconst = require('./getAbsolutePath');
const errorHandler = require('./errorHandler');

const writeStreamData = output => {
  if (output) {
    return fs
      .createWriteStream(getAbsolutePathconst(output), { flags: 'a' })
      .on('error', err => {
        errorHandler(err.message);
      });
  }
  return process.stdout;
};

module.exports = writeStreamData;
