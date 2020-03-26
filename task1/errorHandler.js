const errorHandler = message => {
  process.on('exit', code => {
    process.stderr.write(
      `Error: ${message}\nProgram exit with code: ${code}\n`
    );
  });
  process.exit(1);
};

module.exports = errorHandler;
