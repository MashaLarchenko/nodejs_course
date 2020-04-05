const { program } = require('commander');
const through2 = require('through2');
const { pipeline } = require('stream');
const ReadStreamFactory = require('./readStreamFactory');
const transformStream = require('./transformStream');
const getAbsolutePath = require('./getAbsolutePath');
const errorHandler = require('./errorHandler');
const { shift, input, output } = require('./validateArguments');
const writeStreamData = require('./writeStream');

const factory = new ReadStreamFactory();
const readStream = program.input
  ? factory.createFileReadStream(getAbsolutePath(input))
  : factory.createConsoleReadStream();

const transformer = through2((chunk, enc, callback) => {
  transformStream(chunk, enc, callback, shift);
});
const writeStream = writeStreamData(output);

pipeline(readStream, transformer, writeStream, err => {
  if (err) {
    errorHandler(err.message);
  } else {
    console.log('Pipeline succeeded.');
  }
});
