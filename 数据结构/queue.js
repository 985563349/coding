class Queue {
  #items = {};
  #length = 0;

  push(node) {
    this.#items[this.#length] = node;
    this.#length++;
  }

  shift() {
    if (this.isEmpty()) {
      return null;
    }

    const cur = this.#items[0];

    for (let i = 0; i < this.#length - 1; i++) {
      this.#items[i] = this.#items[i + 1];
    }

    delete this.#items[this.#length - 1];
    this.#length--;

    return cur;
  }

  inset(i, node) {
    for (let k = this.#length; k > i; k--) {
      this.#items[k] = this.#items[k - 1];
    }

    this.#items[i] = node;
    this.#length++;
  }

  out(i) {
    const cur = this.#items[i];

    for (let k = i; k < this.#length - 1; k++) {
      this.#items[k] = this.#items[k + 1];
    }

    delete this.#items[this.#length - 1];
    this.#length--;

    return cur;
  }

  isEmpty() {
    return this.#length === 0;
  }

  clean() {
    this.#items = {};
    this.#length = 0;
  }
}

const queue = new Queue();
queue.push(1);
queue.push(3);
queue.inset(1, 2);
queue.push(4);
queue.out(1);
