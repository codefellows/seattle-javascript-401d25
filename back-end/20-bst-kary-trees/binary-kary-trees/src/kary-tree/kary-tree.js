'use strict';

import Queue from 'queue-fifo';

export default class KAryTree {
  constructor(root) {
    this.root = root;
  }

  // Time : O(n)
  // Space : O(w) -> O(n), where w is the width of each level, i.e. the number of nodes in each level 
  breadthSearchTraversal() {
    if (!this.root) {
      return null;
    }
    return this._breadthFirstSearch(this.root);
  }

  /*eslint-disable*/
  _breadthFirstSearch(root) {
    const queue = new Queue();
    queue.enqueue(root);

    let currentNode = null;

    while (!queue.isEmpty()) {
      currentNode = queue.dequeue();

      // this console.log can be replaced by any other operation
      console.log(`Visiting ${currentNode.value}`);
      for (let i = 0; i < currentNode.children.length; i++) {
        queue.enqueue(currentNode.children[i]);
      }
    }
  }
}
