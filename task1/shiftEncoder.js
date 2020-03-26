const alphabet = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

const shiftAlphabet = (shiftNumber, char) => {
  const lowerChar = char.toLowerCase();
  const indexOf = alphabet.indexOf(lowerChar);
  if (indexOf === -1) {
    return char;
  }

  const isLowerCase = char === char.toLowerCase();
  const shiftedIndex = indexOf + shiftNumber;
  const lastIndex = alphabet.length - 1;
  let resultChar = '';
  if (shiftedIndex >= 0 && shiftedIndex <= lastIndex) {
    resultChar = alphabet[shiftedIndex];
  } else if (shiftedIndex < 0) {
    resultChar = alphabet[lastIndex + shiftedIndex];
  } else {
    resultChar = alphabet[shiftedIndex - lastIndex];
  }
  return isLowerCase ? resultChar : resultChar.toUpperCase();
};

module.exports = shiftAlphabet;
