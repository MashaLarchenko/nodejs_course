/* eslint-disable no-process-exit */
const { program } = require('commander');
const through2 = require('through2');
const readInput = require('./readInput');
const writeData = require('./writeData');
const transformData = require('./transformData');
const { pipeline } = require('stream');

program.version('0.0.1');

program
  .option('-s, --shift <num>', 'a shift')
  .option('-i, --input <filename>', 'an input file')
  .option('-o, --output <filename>', 'an output file')
  .option('-a, --action <action>', 'an action encode/decode');

program.parse(process.argv);

if (!program.action || !program.shift) {
  process.on('exit', code => {
    process.stderr.write(
      `Error: Action (encode/decode) are required argument: ${code}\n`
    );
  });
  process.exit(1);
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

pipeline(
  readInput(program.input ? program.input : null),
  through2((chunk, enc, callback) => {
    transformData(chunk, enc, callback, shiftNumber);
    throw new Error('errr');
  }),
  writeData(program.output ? program.output : null),
  err => {
    if (err) {
      console.log(err);
      if (err.code === 'ENOENT') {
        process.on('exit', code => {
          process.stderr.write(`Error: No such file ${err.path}: ${code}\n`);
        });
        process.exit(1);
      } else {
        process.on('exit', code => {
          process.stderr.write(`inhandled error: ${code}\n`);
        });
        process.exit(err.code);
      }
    } else {
      console.log('Pipeline succeeded.');
    }
  }
);
