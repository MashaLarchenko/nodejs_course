const shiftedAlphabet = require('./shiftedAlphabet');
const { program } = require("commander");
const path = require("path");
const through2 = require("through2");
const fs = require("fs");
program.version("0.0.1");
const { pipeline } = require("stream");

const alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z"
];