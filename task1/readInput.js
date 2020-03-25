/* eslint-disable no-process-exit */
const fs = require('fs');

const readInput = input => {
  if (input) {
    return fs.createReadStream(`${__dirname}/${input}`, 'utf8');
  }
  process.stdin.setEncoding('utf8');

  const data = process.stdin.on('readable', () => {
    const chunk = process.stdin.read();
    return chunk;
  });

  process.stdin.on('end', () => {
    process.stdout.write('end');
  });
  return data;
};

module.exports = readInput;
