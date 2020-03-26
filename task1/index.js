const { program } = require('commander');
const fs = require('fs');
const through2 = require('through2');
const { pipeline } = require('stream');
const ReadStreamFactory = require('./readStreamFactory');
const writeData = require('./writeData');
const transformData = require('./transformData');
const getAbsolutePath = require('./getAbsolutePath');
const errorHandler = require('./errorHandler');

program.version('0.0.1');

program
  .option('-s, --shift <num>', 'a shift')
  .option('-i, --input <filename>', 'an input file')
  .option('-o, --output <filename>', 'an output file')
  .option('-a, --action <action>', 'an action encode/decode');

program.parse(process.argv);

if (!program.action || !program.shift) {
  errorHandler('Action (encode/decode) are required argument');
}

if (program.output && !fs.existsSync(getAbsolutePath(program.output))) {
  errorHandler('No such file or directory');
}

let shiftNumber;
switch (program.action) {
  case 'encode':
    shiftNumber = +program.shift;
    break;
  case 'decode':
    shiftNumber = -program.shift;
    break;
  default:
    shiftNumber = '';
}

const factory = new ReadStreamFactory();
const readStream = program.input
  ? factory.createFileReadStream(getAbsolutePath(program.input))
  : factory.createConsoleReadStream();

const transformer = through2((chunk, enc, callback) => {
  transformData(chunk, enc, callback, shiftNumber);
});
const writeStream = writeData(program.output);

pipeline(readStream, transformer, writeStream, err => {
  if (err) {
    errorHandler(err.message);
  } else {
    console.log('Pipeline succeeded.');
  }
});
