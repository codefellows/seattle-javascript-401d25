'use strict';

import BinaryTree from './lib/binary-tree';
import Node from './lib/node';

const one = new Node(1);
const two = new Node(2);
const three = new Node(3);
const four = new Node(4);
const five = new Node(5);
const six = new Node(6);
const seven = new Node(7);
const eight = new Node(8);
const nine = new Node(9);
const tree = new BinaryTree(one);

one.left = two;
one.right = three;

three.left = four;
three.right = five;

two.left = six;

six.right = seven;

seven.left = eight;
seven.right = nine;

const CHEATER = 0;

const _findEvenValueInBinaryTree = (node) => {
  if (node === null) {
    return false;
  }
  if (node.value % 2 === 0) {
    console.log(`We found an even value: ${node.value}`);
    return true;
  }
  // Vinicio - An or function works like this
  // A       B
  // false false = false
  // false true  = true
  // true  false = true
  // true  true  = true

  return _findEvenValueInBinaryTree(node.left) || _findEvenValueInBinaryTree(node.right);
};

// const _findEvenValueInBinaryTree = (node) => {
//   if (node === null) {
//     return false;
//   }
//   if (node.value % 2 === 0) {
//     console.log(`We found an even value: ${node.value}`);
//     return true;
//   }
//   const leftTreeValue = _findEvenValueInBinaryTree(node.left);
//
//   if (leftTreeValue === true) {
//     return true;
//   } else {
//     return _findEvenValueInBinaryTree(node.right);
//   }
// };

const findEvenValueInBinaryTree = (inputTree) => {
  // 1 - Input Validation
  // 2 - Perform the recursive call ON THE ROOT
  return _findEvenValueInBinaryTree(inputTree.root);
};

console.log(findEvenValueInBinaryTree(tree));
