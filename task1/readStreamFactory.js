const fs = require('fs');
const errorHandler = require('./errorHandler');

class ReadStreamFactory {
  createFileReadStream(filePath) {
    return fs.createReadStream(filePath, 'utf8').on('error', err => {
      errorHandler(err.message);
    });
  }

  createConsoleReadStream() {
    process.stdin.setEncoding('utf8');
    process.stdout.write('Enter your data, for exit push CTRL + C:\n');
    return process.stdin.on('data', () => {
      const chunk = process.stdin.read();
      return chunk;
    });
  }
}

module.exports = ReadStreamFactory;
