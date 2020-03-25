// const shiftedAlphabet = require('./shiftedAlphabet');
const { program } = require('commander');
// const path = require('path');
// const through2 = require('through2');
// const fs = require('fs');
program.version('0.0.1');
// const { pipeline } = require('stream');

program
  .requiredOption('-s, --shift <num>', 'a shift')
  .option('-i, --input <filename>', 'an input file')
  .option('-o, --output <filename>', 'an output file')
  .requiredOption('-a, --action <action>', 'an action encode/decode');

program.parse(process.argv);
