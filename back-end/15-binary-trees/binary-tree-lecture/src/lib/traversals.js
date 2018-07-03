
// Time complexity for all traversals: O(n) where n is the number of nodes
// Space complexity of depth-first traversals: O(h), where h is the height of the tree
const preOrderTraversal = (rootNode, callback) => {
  // pre-order: root, left, right
  if (!rootNode) return undefined;
  // at this point, I am in the root
  callback(rootNode.value);
  preOrderTraversal(rootNode.left, callback);
  preOrderTraversal(rootNode.right, callback);
  return undefined;
};

const postOrderTraversal = (rootNode, callback) => {
  // post-order: left, right, root;
  if (!rootNode) return undefined;
  postOrderTraversal(rootNode.left, callback);
  postOrderTraversal(rootNode.right, callback);
  callback(rootNode.value);
  return undefined;
};

export { preOrderTraversal, postOrderTraversal };


