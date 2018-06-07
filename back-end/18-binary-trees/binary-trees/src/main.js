'use strict';

import KAryNode from './lib/kary-node';
import KAryTree from './lib/kary-tree';

// -----------------------------------------------------------------------------------
const one = new KAryNode(1);
one.appendChild(2); // 0
one.appendChild(3); // 1
one.appendChild(4); // 2

one.children[1].appendChild(5); // 0
one.children[1].appendChild(6); // 1
one.children[1].appendChild(7); // 2

one.children[1].children[1].appendChild(8);

const kAryTree = new KAryTree(one);

kAryTree.breadthSearchTraversal();

// -----------------------------------------------------------------------------------
// const bstFinal = new BinarySearchTree();
// bstFinal.insert(new Node(10));
// bstFinal.insert(new Node(15));
// bstFinal.insert(new Node(8));
// bstFinal.insert(new Node(16));
//
// console.log(bstFinal.find(10));
// console.log(bstFinal.find(16));
// console.log(bstFinal.find(100));
// -----------------------------------------------------------------------------------

// import { preOrderTraversal, postOrderTraversal } from './lib/traversals';
//
// const one = new Node(1);
// const two = new Node(2);
// const three = new Node(3);
// const four = new Node(4);
// const five = new Node(5);
// const six = new Node(6);
// const seven = new Node(7);
// const eight = new Node(8);
// const nine = new Node(9);
// const tree = new BinaryTree(one);
//
// one.left = two;
// one.right = three;
//
// three.left = four;
// three.right = five;
//
// two.left = six;
//
// six.right = seven;
//
// seven.left = eight;
// seven.right = nine;
//
//
// console.log('Pre-Order');
// preOrderTraversal(tree.root);
//
// console.log('Post-Order');
// postOrderTraversal(tree.root);
