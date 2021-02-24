class Stack {
  #items = {};
  #length = 0;

  push(value) {
    this.#items[this.#length] = value;
    this.#length++;
  }

  pop() {
    if (this.isEmpty()) {
      return null;
    }

    this.#length--;
    const value = this.#items[this.#length];
    delete this.#items[this.#length];

    return value;
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

const stack = new Stack();
