'use strict';

// Confirm which endian you are

const os = require('os');
console.log(os.endianness());

const buf = Buffer.from('Codefellows');

console.log(buf);
// buf[0] = 42;


for (let i = 0; i < buf.length; i += 4) {
  buf[i] += 6;
}

console.log(buf);
console.log(buf.toString());

// arg is the number of bits to skip before starting to read
console.log(buf.readUInt8(0));

// reading the first 10 bits
// console.log(buf.readUInt16BE(5));
console.log(buf.readUInt32LE(5));
// console.log(buf.readUInt32BE(5));