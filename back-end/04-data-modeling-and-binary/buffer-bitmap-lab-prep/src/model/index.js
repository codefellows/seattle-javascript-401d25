'use strict';

// size of file bitmap header = 14 bytes
// size of DIB header = 12 bytes

const Bitmap = module.exports = class {
  constructor(buffer) {
    const fileSizeOffset = 2;
    const bitmapWidth = 18;
    const bitmapHeight = 20;
    const colorTableLength = 1078
    // TODO: find which decimal number the colorTableOffset starts at
    const colorTableOffset;

    // this could probably be a different readUint method
    this.fileSize = buffer.readUInt32LE(fileSizeOffset);
    this.height = buffer.readUInt32LE(bitmapHeight);
    this.width = buffer.readUInt32LE(bitmapWidth);
    // this.colorTable = some method from the Buffer class that passes in the colorTableOffset variable and the colorTableLength so you can just access that portion of the buffer at that offset and manipulate that data 
  }

  // possible methods
  // greyscale()
  // invertColors()
  // fillWithBlack/Red/Green/etc
  // flipImage()
  // addBorder()
};

