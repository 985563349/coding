class Stack {
  #items = {};
  #length = 0;

  push(node) {
    this.#items[this.#length] = node;
    this.#length++;
  }

  pop() {
    if (this.isEmpty()) {
      return null;
    }

    this.#length--;
    const node = this.#items[this.#length];
    delete this.#items[this.#length];

    return node;
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    }

    return this.#items[this.#length - 1];
  }

  isEmpty() {
    return this.#length === 0;
  }

  clean() {
    this.#length = 0;
    this.#items = {};
  }
}

module.exports = Stack;
