const fs = require('fs');
const getAbsolutePathconst = require('./getAbsolutePath');

const writeData = output => {
  if (output) {
    return fs.createWriteStream(getAbsolutePathconst(output), { flags: 'a' });
  }
  return process.stdout;
};

module.exports = writeData;
