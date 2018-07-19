import Graph from '../lib/graph';
import Node from '../lib/node';
import DFS from '../lib/sort-of-dfs';

describe('DFS Search', () => {
  test('testing DFS search', () => {
    const graph = new Graph();
    const node5 = new Node(5);
    const node10 = new Node(10);
    const node15 = new Node(15);
    const node20 = new Node(20);
    const node25 = new Node(25);
    const node30 = new Node(30);
    const node35 = new Node(35);
    const node40 = new Node(40);
    const node45 = new Node(45);
    const node50 = new Node(50);
    const node100 = new Node(100);

    // add nodes
    graph.addNode(node5);
    graph.addNode(node10);
    graph.addNode(node15);
    graph.addNode(node20);
    graph.addNode(node25);
    graph.addNode(node30);
    graph.addNode(node35);
    graph.addNode(node40);
    graph.addNode(node45);
    graph.addNode(node50);

    // add edges
    graph.addEdge(node5, node45);
    graph.addEdge(node5, node35);
    graph.addEdge(node5, node30);
    graph.addEdge(node5, node20);
    graph.addEdge(node5, node10);

    graph.addEdge(node10, node20);
    graph.addEdge(node30, node20);
    graph.addEdge(node30, node40);
    graph.addEdge(node40, node50);

    graph.addEdge(node10, node15);
    graph.addEdge(node20, node25);
    graph.addEdge(node15, node25);

    const paths = DFS(graph, node5, node25);
    console.log(paths);
    expect(paths).not.toBeNull();
    expect(paths.has(node25)).toBeTruthy();
    const nonExistentPaths = DFS(graph, node5, node100);
    expect(nonExistentPaths).toBeNull();
  });
});
