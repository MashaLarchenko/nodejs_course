const shiftAlphabet = require('./shiftAlphabet');

const transformData = (chunk, enc, callback, shiftNumber) => {
  const buf = Buffer.from(chunk, enc).toString('utf-8');
  let encodeStr = '';
  for (let i = 0; i < buf.length; i++) {
    encodeStr += shiftAlphabet(shiftNumber, buf[i]);
  }
  callback(null, encodeStr);
};

module.exports = transformData;
