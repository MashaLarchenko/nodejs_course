const fs = require('fs');

const writeData = (output, data) => {
  if (output) {
    return fs.createWriteStream(`${__dirname}/${output}`).on('error', () => {
      process.stderr.write(
        process.on('exit', code => {
          console.log(`About to exit with code: ${code}`);
        })
      );
      // process.exitCode(4);
    });
  }
  process.stdout.write(`data: ${data}`);
};

module.exports = writeData;
