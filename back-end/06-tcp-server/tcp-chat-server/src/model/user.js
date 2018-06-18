'use strict';

const uuid = require('uuid/v4');

module.exports = class User {
  constructor(socket) {
    this._id = uuid();
    this.nickname = `User no. ${this._id}`;
    this.socket = socket;
  }
};

