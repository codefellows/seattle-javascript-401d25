'use strict';

/*eslint-disable*/
const PriorityQueue = require('js-priority-queue');

module.exports = (graph, startNode, goalNode) => {
  const visitedNodes = new Set();
  const parentMap = new Map();
  const shortestPathSoFar = new Map();

  const priorityQueue = new PriorityQueue({
    comparator: (a, b) => a.priority - b.priority,
  });

  priorityQueue.queue({
    node: startNode,
    priority: 0,
  });
  shortestPathSoFar.set(startNode, 0);


  while (priorityQueue.length > 0) {
    const currentNode = priorityQueue.dequeue().node;

    if (visitedNodes.has(currentNode)) { continue; }
    
    visitedNodes.add(currentNode);

    if (currentNode === goalNode) { return parentMap; }
    
    const neighbors = graph.getNeighbors(currentNode);

    for (const neighbor of neighbors) {
      const neighborWeight = neighbor.weight;
      const neighborNode = neighbor.node;

      if (visitedNodes.has(neighborNode)) { continue; }
      
      const newPathWeight = shortestPathSoFar.get(currentNode) + neighborWeight;

      if (!shortestPathSoFar.has(neighbor) ||
         newPathWeight < shortestPathSoFar.get(neighborNode)) {

        shortestPathSoFar.set(neighborNode, newPathWeight);
        parentMap.set(neighborNode, currentNode);

        priorityQueue.queue({
          node: neighborNode,
          priority: shortestPathSoFar.get(neighborNode),
        });
      }
    }
  }
  return null; 
};
