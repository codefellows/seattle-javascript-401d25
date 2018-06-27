![cf](http://i.imgur.com/7v5ASc8.png) Trees
===

## Learning Objectives
* Students will learn about the tree data structure

## Readings
* Read [BST interview questions](https://khan4019.github.io/front-end-Interview-Questions/bst.html)
* Read [Traversing a tree](https://www.geeksforgeeks.org/bfs-vs-dfs-binary-tree/)

## Outline

### What is a Tree?
![trees](https://s3-us-west-2.amazonaws.com/s.cdpn.io/154088/Screen%20Shot%202017-03-30%20at%204.47.30%20PM.png)

Trees are a widely used data structure that simulate a hierarchical "tree" structure. These data structures contain a **root**, which may or may not contain a series of child sub-trees. They can also be defined recursively as a collection of nodes, which starts at the root node and each node is a data structure consisting of a value and an array of references to any child nodes. Trees are also considered to be a directed, acyclic, connected graph.

### Breaking Down A Tree
  * **root:** - the top node in a tree
  * **parent:** - a node that links down to other nodes (is the root of a sub-tree)
  * **child:** - a node that's a direct sub-tree of another node
  * **siblings:** - a group of nodes with the same parent
  * **leaf:** - a node with node children
  * **edge:** - a connection (link) between nodes
  * **height:** - the distance (# of edges) from the root of a tree or sub-tree to the furthest leaf
    * Leaves will always have a height of zero
  * **depth:** - the distance (# of edges) from a node to the root
    * The root node will always have a depth of 0
  * **level:** - nodes that exist at the same height in a tree (1-based)
  * **balance:** - if the height of both sides of a tree are <= 1, the tree is balanced
   
### Traversing a Tree
In/Pre/Post order are all "depth first" searching methods that center themselves on in the order in which we visit the root node.  
  * **Pre order:** root - left - right
  * **Post order:** left - right - root
  * **In order:** left - root - right
  
Breadth First Search
  * **Level Order Traversal**
  
  
### Useful Implementations of Trees**
  * the DOM
  * a computer file system
  * sorting and searching
