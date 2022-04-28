const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  data = null;
  rightChild = null;
  leftChild = null;

  root() {
    return this.data === null ? null : {
      data: this.data,
      rightChild: this.rightChild,
      leftChild: this.leftChild
    };
  }

  add(data) {
    if (this.data === null) {
      this.data = data;
      return;
    }
    let curNode = this;
    while (curNode.leftChild || curNode.rightChild) {
      if (curNode.data > data) {
        if (!curNode.leftChild) {
          break;
        }
        curNode = curNode.leftChild;
      }
      if (curNode.data < data) {
        if(!curNode.rightChild) {
          break;
        }
        curNode = curNode.rightChild;
      }
    }
    if (curNode.data > data) {
      curNode.leftChild = new BinarySearchTree();
      curNode.leftChild.add(data);
    } else {
      curNode.rightChild = new BinarySearchTree();
      curNode.rightChild.add(data);
    }
  }

  has(data) {
    return this.find(data) !== null;
  }

  find(data) {
    let curNode = this;
    while (curNode.data !== data && (curNode.leftChild || curNode.rightChild)) {
      if (curNode.data > data) {
        if (!curNode.leftChild) {
          break;
        }
        curNode = curNode.leftChild;
      }
      if (curNode.data < data) {
        if (!curNode.rightChild) {
          break;
        }
        curNode = curNode.rightChild;
      }
    }
    return curNode.data === data ? curNode : null;
  }

  remove(data) {
    let node = this;
    let parent = null;
    while (node.data !== data && (node.leftChild || node.rightChild)) {
      if (node.data > data) {
        if (!node.leftChild) {
          break;
        }
        parent = node;
        node = node.leftChild;
      }
      if (node.data < data) {
        if (!node.rightChild) {
          break;
        }
        parent = node;
        node = node.rightChild;
      }
    }
    // No node with the data was found
    if (node === null) {
      return;
    }
    // Node with the data is a leaf (has no children)
    if (!node.leftChild && !node.rightChild) {
      if (parent.data > node.data) {
        parent.leftChild = null;
        return;
      }
      if (parent.data < node.data) {
        parent.rightChild = null;
        return;
      }
    }
    // Node with the data has only left child
    if (node.leftChild && !node.rightChild) {
      if (parent.data > node.data) {
        parent.leftChild = node.leftChild;
        return;
      }
      if (parent.data < node.data) {
        parent.rightChild = node.leftChild;
        return;
      }
    }
    // Node with the data has only right child
    if (!node.leftChild && node.rightChild) {
      if (parent.data > node.data) {
        parent.leftChild = node.rightChild;
        return;
      }
      if (parent.data < node.data) {
        parent.rightChild = node.rightChild;
        return;
      }
    }
    // Node with the data has two children
    const nextNode  = node.rightChild.minNode();
    this.remove(nextNode.data);
    node.data = nextNode.data;
  }

  minNode() {
    let curNode = this;
    while (curNode.leftChild) {
      curNode = curNode.leftChild;
    }
    return curNode;
  }

  min() {
    return this.minNode().data;
  }

  max() {
    let curNode = this;
    while (curNode.rightChild) {
      curNode = curNode.rightChild;
    }
    return curNode.data;
  }
}

module.exports = {
  BinarySearchTree,
};
