'use strict';

const LinkedList = require('../linked-list/index');

module.exports = class HashMap {
  constructor(capacity = 20) {
    this._capacity = capacity;
    this._buckets = new Array(capacity);
  }

  _generateHash(key) {
    if (typeof key !== 'string') {
      throw new TypeError('HASHMAP ERROR: key should be a string');
    }

    let hash = 0;

    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }

    //  x % y => some number between 0 and (y-1)
    return hash % this._capacity; // For capacity of 20, we get some number between 0-19
  }

  set(key, htValue) {
    const hash = this._generateHash(key);

    // if no record is in the hashmap, make a new record
    if (!this._buckets[hash]) {
      this._buckets[hash] = new LinkedList({ key, htValue });
      return this;
    }

    // if there is a collision
    this._buckets[hash].append(new LinkedList({ key, htValue }));
    return this;
  }

  get(key) {
    const hash = this._generateHash(key);
    const error = new Error(`No entry for ${key}`);
    if (!this._buckets[hash]) {
      throw error;
    }

    const node = this._buckets[hash].find(foundNode => foundNode.value.key === key);
    if (node) return node.value.htValue;
    return error;
  }

  delete(key) {
    const hash = this._generateHash(key);
    const error = new Error(`No entry for ${key}`);

    if (!this._buckets[hash]) {
      throw error;
    }

    const node = this._buckets[hash].find(foundNode => foundNode.value.key === key);

    if (node) {
      this._buckets[hash] = this._buckets[hash].remove(node);
      console.log('Successfully removed');
      return 'Successfully removed';
    }

    return error;
  }
};
