const { program } = require('commander');
const fs = require('fs');
const errorHandler = require('./errorHandler');
const getAbsolutePath = require('./getAbsolutePath');

program.version('0.0.1');

program
  .option('-s, --shift <num>', 'a shift')
  .option('-i, --input <filename>', 'an input file')
  .option('-o, --output <filename>', 'an output file')
  .option('-a, --action <action>', 'an action encode/decode');

program.parse(process.argv);

if (typeof program.action === 'function') {
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

if (program.shift <= 0) {
  errorHandler(
    'Invalid number for --shift argument , please, enter number more than 0'
  );
}

let shiftNumber = shiftArg;
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

exports.shift = shiftNumber;
exports.action = program.action;
exports.input = program.input;
exports.output = program.output;
