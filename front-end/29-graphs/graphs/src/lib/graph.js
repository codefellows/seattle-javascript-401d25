// adjacency list is a hashmap where the keys are the nodes themselves and their values are an array/linked list of the nodes they are directly connected

export default class Graph {
  constructor() {
    // a map is an obect where the keys can be any data type such as objects or functions, not just strings as they are in objects
    this.adjacencyList = new Map();
  }

  addNode(node) {
    // .set creates a new key/value pair in the map
    this.adjacencyList.set(node, []);
  }

  // this adds an edge between two given nodes and sets the default weight of that edge to 0
  // weight is not being used in this code, but just demo'd here to remind you a graph edge can be weighted
  // ".has" is a method on Map that returns true/false if it has the specified key
  addEdge(startNode, endNode, weight = 0) {
    const hasNodes = this.adjacencyList.has(startNode) || this.adjacencyList.has(endNode);
    if (!hasNodes) {
      throw new Error('Invalid nodes');
    }

    // .get is a method on Map that gets the value of the passed in argument which is the key
    // adjacencies is an array
    const adjacencies = this.adjacencyList.get(startNode);
    adjacencies.push({
      node: endNode,
      weight,
    });
  }

  getNeighbors(node) {
    if (!this.adjacencyList.has(node)) {
      throw new Error('Invalid node');
    }

    // we are just returning a copy of our array as a design choice so user cannot make changes directly to our internal representation of our graph
    return [...this.adjacencyList.get(node)];
  }
}
