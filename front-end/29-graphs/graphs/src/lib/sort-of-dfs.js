
// DFS is not guaranteed to return the most optimal path in a graph

export default (graph, startNode, goalNode) => {
  const stack = [];
 
  // we need to keep track of visited nodes so we don't revisit them
  // a Set is a collection of unique values or "keys"
  const visitedNodes = new Set();
  
  // we use this map to keep track of the nodes we saw while traveling to the goal, think of this like breadcrumbs
  // A Map is like a JS object except its keys can be anything besides a string
  /*
    this parent map will look like this (it's a little anti-intuitive, we read right to left):
    If this was a map representing a graph where Node A has edges to Nodes B and C
    Destination point B => Origin point A
    Destination point C => Origin point A
  */

  const parentMap = new Map();
  // we push the start Node onto our stack and add it into our visited nodes set to keep track that it was visited
  // we could potentially add a "visited" property to our Node as well, but this is just a design choice to leave the Node class alone and untouched

  stack.push(startNode);
  visitedNodes.add(startNode);

  while (stack.length) {
    const currentNode = stack.pop();

    // if we reach our goal node, we stop execution and return our parentMap, which will represent the paths we took before we found our goal node
    if (currentNode === goalNode) {
      return parentMap;
    }
    // if we are not at our goal node, we check all the neighbors and put them into the stack
    // remember that the "getNeighbors" method on our graph returns an array of all the neighbors the currentNode is connected to
    const neighbors = graph.getNeighbors(currentNode);
    console.log(neighbors, 'NEIGHBORS');

    /*eslint-disable*/
    // disabling this because Airbnb linter doesn't like "for let of" loops
    // currentNode is the neighbor's "parent" or origin point

    for (let neighbor of neighbors) {
      let neighborNode = neighbor.node;

      if (visitedNodes.has(neighborNode)) {
        continue;
        // we use "continue" to skip all the code below and move on to next neighbor
      } 

      visitedNodes.add(neighborNode);

      //update parent set
      parentMap.set(neighborNode, currentNode);
      // push into stack
      stack.push(neighborNode);
    }
  }
  // if we get here, there is no path
  return null;

}