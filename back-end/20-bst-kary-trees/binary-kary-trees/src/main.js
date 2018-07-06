import Node from './binary-search-tree/node';
import BinarySearchTree from './binary-search-tree/binary-search-tree';
import KAryNode from './kary-tree/kary-node';
import KAryTree from './kary-tree/kary-tree';

const one = new KAryNode(1);
one.appendChild(2); // 0
one.appendChild(3); // 1
one.appendChild(4); // 2

one.children[1].appendChild(5); // 0
one.children[1].appendChild(6); // 1
one.children[1].appendChild(7); // 2

one.children[1].children[1].appendChild(8);

const kAryTree = new KAryTree(one);

console.log('THIS IS A K-ARY TREE');
console.log(JSON.stringify(kAryTree, null, 2));
kAryTree.breadthSearchTraversal();


// console.log('THIS IS A BST');
// const bst = new BinarySearchTree();
// bst.insert(new Node(10));
// bst.insert(new Node(15));
// bst.insert(new Node(8));
// bst.insert(new Node(16));

// console.log(JSON.stringify(bst, null, 2));
