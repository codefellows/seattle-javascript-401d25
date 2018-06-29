'use strict';

import Node from './node';
class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }
}

const nodes = [];
for (let i = 1; i <= 9; i++) {
  nodes.push(new Node(i));
}

// array destructuring
// this is the same as doing this:
// const one = nodes[0]
// const two = nodes[1]
// const three = nodes[3]
const [one, two, three, four, five, six, seven, eight, nine] = nodes;

// manually connecting my nodes together to make a tree
one.left = two;
one.right = three;

two.left = six;

three.left = four;
three.right = five;

six.right = seven;

seven.left = eight;
seven.right = nine;

const binaryTree = new BinaryTree(one);

console.log(binaryTree, 'NOT PRETTY');
// this just expands my tree out so we can see deeply nested objects
console.log(JSON.stringify(binaryTree, null, 2));

export default binaryTree;
