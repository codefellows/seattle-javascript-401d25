'use strict';

// First in, first out

// Implement a <data structure> using another <data structure>
module.exports = class Queue {
  constructor() {
    // in this example implementation, I'm using an array
    // in your implementation, this will be a Linked List
    this.storage = [];
  }

  enqueue(value) {
    this.storage.unshift(value);
  }

  dequeue() {
    return this.storage.pop();
  }

  peek() {
    return this.storage[this.storage.length - 1];
  }

  isEmpty() {
    return !this.storage.length;
  }
};

