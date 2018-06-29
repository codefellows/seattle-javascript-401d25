'use strict';

import binaryTree from '../model/binary-tree';
import { preOrderTraversal } from '../lib/traversals';


describe('PRE-ORDER', () => {
  test('Expecting a string of visited nodes as 1, 2, 6, 7, 8, 9, 3, 4, 5, ', () => {
    // remember that I made my traversal signatures accept a callback so I can apply any kind of logic to each visited node in the test environment

    let str = '';
    preOrderTraversal(binaryTree.root, (nodeValue) => {
      str += `${nodeValue}, `;
    });
    expect(str.trim()).toEqual('1, 2, 6, 7, 8, 9, 3, 4, 5,');
  });
});
