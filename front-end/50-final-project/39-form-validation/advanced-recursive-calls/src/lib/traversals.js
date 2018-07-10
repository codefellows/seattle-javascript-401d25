'use strict';

// Time - O(N) where n is the number of nodes
// Space - O(H) where h is the height of the tree
const preOrderTraversal = (rootNode) => {
// Vinicio - Root - Left - Right
  if (!rootNode) {
    return undefined;
  }
  //---------------------------------------------------------
  // Vinicio - Here, I AM IN ROOT
  console.log(`Visiting a node with value ${rootNode.value}`);
  //---------------------------------------------------------
  preOrderTraversal(rootNode.left); // rootNode.left is a sub-tree
  preOrderTraversal(rootNode.right);
  return undefined;
};

// Time - O(H) where n is the number of nodes
// Space - O(H) where h is the height of the tree
const postOrderTraversal = (rootNode) => {
// Vinicio -  Left - Right -Root
  if (!rootNode) {
    return undefined;
  }
  postOrderTraversal(rootNode.left);
  postOrderTraversal(rootNode.right);
  //---------------------------------------------------------
  // This line is not going to happen until we visit ALL left and ALL right
  // Vinicio - Here, I AM IN ROOT
  console.log(`Visiting a node with value ${rootNode.value}`);
  return undefined;
  //---------------------------------------------------------
};

export { preOrderTraversal,postOrderTraversal };
