const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement the Stack with a given interface via array.
 *
 * @example
 * const stack = new Stack();
 *
 * stack.push(1); // adds the element to the stack
 * stack.peek(); // returns the peek, but doesn't delete it, returns 1
 * stack.pop(); // returns the top element from stack and deletes it, returns 1
 * stack.pop(); // undefined
 *
 */
class Stack {
  arr = [];
  push(element) {
    this.arr[this.arr.length] = element;
  }

  pop() {
    const elem = this.arr[this.arr.length - 1];
    if (this.arr.length > 0) {
      this.arr.length -= 1;
    }
    return elem;
  }

  peek() {
    return this.arr[this.arr.length - 1];
  }
}

module.exports = {
  Stack,
};
