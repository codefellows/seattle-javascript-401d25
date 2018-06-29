'use strict';

export default class Node {
  // this is a shorthand es6 way of setting default arguments
  // if we don't get a value for left or right, it defaults to null
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

