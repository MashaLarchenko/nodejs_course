// const through2 = require('through2');
const shiftAlphabet = require('./shiftAlphabet');
// const fs = require("fs");
// const { pipeline } = require('stream');

const transformData = (chunk, enc, callback, shiftNumber) => {
  // console.log(program);
  const buf = Buffer.from(chunk, enc).toString('utf-8');
  let encodeStr = '';
  for (let i = 0; i < buf.length; i++) {
    encodeStr += shiftAlphabet(shiftNumber, buf[i]);
  }
  callback(null, encodeStr);
};

module.exports = transformData;
