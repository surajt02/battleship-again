class Player {
  #name;
  #type;
  #gameboard;

  constructor(name, type, gameboard) {
    this.#name = name;
    this.#type = type;
    this.#gameboard = gameboard;
  }

  get name() {
    return this.#name;
  }

  get type() {
    return this.#type;
  }

  get gameboard() {
    return this.#gameboard;
  }
}

export default Player;
