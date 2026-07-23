class Ship {
  #name;
  #length;
  #health;
  #sunk;

  constructor(name, length) {
    this.#name = name;
    this.#length = length;
    this.#health = length;
    this.#sunk = false;
  }

  get name() {
    return this.#name;
  }

  get length() {
    return this.#length;
  }

  get health() {
    return this.#health;
  }

  get isSunk() {
    if (this.#health <= 0) {
      this.#sunk = true;
    }
    return this.#sunk;
  }

  hit() {
    if (!this.isSunk) {
      this.#health--;
    }
  }
}

export default Ship;
