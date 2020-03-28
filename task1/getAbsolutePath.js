const path = require('path');

const getAbsolutePath = inputPath => {
  return path.join(__dirname, inputPath);
};

module.exports = getAbsolutePath;
