const fs = require('fs');

const readInput = input => {
  if (input) {
    return fs
      .createReadStream(`${__dirname}/${input}`, 'utf8')
      .on('error', () => {
        process.on('exit', code => {
          console.log(`About to exit with code: ${code}`);
        });
        process.stderr();

        process.exitCode(1);
      });
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
