const { program } = require('commander');
const fs = require('fs');
const through2 = require('through2');
const { pipeline } = require('stream');
const ReadStreamFactory = require('./readStreamFactory');
const writeStreamOutput = require('./writeStream');
const transformStream = require('./transformStream');
const getAbsolutePath = require('./getAbsolutePath');
const errorHandler = require('./errorHandler');

program.version('0.0.1');

program
  .option('-s, --shift <num>', 'a shift')
  .option('-i, --input <filename>', 'an input file')
  .option('-o, --output <filename>', 'an output file')
  .option('-a, --action <action>', 'an action encode/decode');

program.parse(process.argv);

if (!program.action) {
  errorHandler('Action (encode/decode) is required argument');
}

if (!program.shift) {
  errorHandler('Shift is required argument, please enter number from 1 to 25');
}

if (program.output && !fs.existsSync(getAbsolutePath(program.output))) {
  errorHandler(`No such file or directory ${__dirname}/${program.output}`);
}

const shiftArg = ((num = program.shift) => {
  let shiftNumber = num;
  if (program.shift <= 26) {
    return shiftNumber;
  }
  shiftNumber = Math.floor(shiftNumber % 26);
  if (shiftNumber <= 26) {
    return shiftNumber;
  }
  return shiftArg(shiftNumber);
})();

// if (program.shift >= 26 || program.shift <= 0) {
//   errorHandler(
//     'Invalid number for --shift argument , please, enter number from 1 to 25'
//   );
// }

let shiftNumber;
switch (program.action) {
  case 'encode':
    shiftNumber = +shiftArg;
    break;
  case 'decode':
    shiftNumber = -shiftArg;
    break;
  default:
    shiftNumber = '';
}

const factory = new ReadStreamFactory();
const readStream = program.input
  ? factory.createFileReadStream(getAbsolutePath(program.input))
  : factory.createConsoleReadStream();

const transformer = through2((chunk, enc, callback) => {
  transformStream(chunk, enc, callback, shiftNumber);
});
const writeStream = writeStreamOutput(program.output);

pipeline(readStream, transformer, writeStream, err => {
  if (err) {
    errorHandler(err.message);
  } else {
    console.log('Pipeline succeeded.');
  }
});
