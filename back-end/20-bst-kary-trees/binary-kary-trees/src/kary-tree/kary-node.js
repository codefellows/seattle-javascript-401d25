'use strict';

export default class KAryNode {
  constructor(value) {
    this.value = value;
    this.children = [];
  }

  appendChild(value) {
    const nodeToAppend = new KAryNode(value);
    this.children.push(nodeToAppend);
  }
}
