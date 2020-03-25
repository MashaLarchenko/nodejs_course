// const shiftedAlphabet = require('./shiftedAlphabet');
const { program } = require('commander');
// const path = require('path');
const through2 = require('through2');
const readInput = require('./readInput');
const writeData = require('./writeData');
const transformData = require('./transformData');
const fs = require('fs');
program.version('0.0.1');
const { pipeline } = require('stream');

program
  .option('-s, --shift <num>', 'a shift')
  .option('-i, --input <filename>', 'an input file')
  .option('-o, --output <filename>', 'an output file')
  .requiredOption('-a, --action <action>', 'an action encode/decode');

program.parse(process.argv);

if (!program.action || !program.shift) {
  // throw new Error('--myoption required');
  //   process.stderr.write('action and shift arguments are required');
  process.stderr.write(
    process.on('exit', code => {
      console.log(`About to exit with code: ${code}`);
    })
  );
  process.exitCode(1);
}

if (program.action) {
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
    }).on('data', data => {
      writeData(program.output ? program.output : null, data);
    }),
    fs.createWriteStream(`${__dirname}/${program.output}`, 'utf8'),

    err => {
      if (err) {
        console.error('Pipeline failed.', err);
      } else {
        console.log('Pipeline succeeded.');
      }
    }
  );
}
