import Graph from '../lib/graph';
import Node from '../lib/node';

describe('Testing Graph class', () => {
  let graph;

  beforeEach(() => {
    graph = new Graph();
  });

  test('Testing constructor', () => {
    expect(graph.adjacencyList).toBeInstanceOf(Map);
  });

  test('Adding nodes', () => {
    for (let i = 1; i <= 10; i++) {
      const node = new Node(i);
      graph.addNode(node);
    }

    const eleven = new Node(11);
    expect(graph.adjacencyList.size).toEqual(10);
    graph.addNode(eleven);
    expect(graph.adjacencyList.get(eleven)).toEqual([]);
    graph.adjacencyList.get(eleven).push(1);
    expect(graph.adjacencyList.get(eleven)).toHaveLength(1);
    expect(graph.adjacencyList.get(eleven)).toEqual([1]);
  });

  test('Adding edges', () => {
    const nodeA = new Node('a');
    const nodeB = new Node('b');

    graph.addNode(nodeA);
    graph.addNode(nodeB);
    graph.addEdge(nodeA, nodeB);

    // this is an array of Node A's adjacent neighbors
    const neighborsOfA = graph.getNeighbors(nodeA);

    expect(neighborsOfA).toBeInstanceOf(Array);
    expect(neighborsOfA).toHaveLength(1);
    expect(neighborsOfA[0].node).toEqual(nodeB);
    expect(neighborsOfA[0].weight).toEqual(0);

    console.log(neighborsOfA);
  })
});
