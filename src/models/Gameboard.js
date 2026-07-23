class Gameboard {
  #size;
  #attacksBoard;
  #shipsBoard;
  #numShips;
  #shipSunkCount;

  constructor(size) {
    this.#size = size;
    this.#attacksBoard = this.createGrid(size);
    this.#shipsBoard = this.createGrid(size);
    this.#numShips = 0;
    this.#shipSunkCount = 0;
  }

  createGrid(n) {
    return Array.from(
      {
        length: n,
      },
      () => new Array(n).fill(0),
    );
  }

  canPlaceShip(length, row, col, orientation) {
    const numRows = this.#shipsBoard.length;
    const numCols = this.#shipsBoard[0].length;

    // Boundary check
    if (row < 0 || row >= numRows || col < 0 || col >= numCols) return false;
    if (orientation === "horizontal" && col + length > numCols) return false;
    if (orientation === "vertical" && row + length > numRows) return false;

    // Collision check
    for (let i = 0; i < length; i++) {
      const r = orientation === "horizontal" ? row : row + i;
      const c = orientation === "horizontal" ? col + i : col;

      if (this.#shipsBoard[r][c] !== 0) {
        return false; // Cell is already occupied
      }
    }

    return true;
  }

  placeShip(ship, row, col, orientation) {
    const length = ship.length();

    if (!this.canPlaceShip(length, row, col, orientation)) {
      return false;
    }

    for (let i = 0; i < length; i++) {
      const r = orientation === "horizontal" ? row : row + i;
      const c = orientation === "horizontal" ? col + i : col;
      this.#shipsBoard[r][c] = ship;
    }
    this.#numShips++;
    return true;
  }

  // 0 = nothing happened yet, 1 = hit, 2 = miss
  recieveAttack(row, col) {
    // this position has already been attacked
    if (this.#attacksBoard[row][col] !== 0) {
      console.log(`already attacked position ${row} ${col}`);
      return;
    }

    // Ship exists at position
    if (this.#shipsBoard[row][col] !== 0) {
      // Mark position as hit
      this.#attacksBoard[row][col] = 1;
      this.#shipsBoard[row][col].hit();
      if (this.#shipsBoard[row][col]?.isSunk()) {
        this.#shipSunkCount++;
      }
    } else {
      // Mark position as miss
      this.#attacksBoard[row][col] = 2;
    }
  }

  get size() {
    return this.#size;
  }

  remainingShips() {
    return this.#numShips - this.#shipSunkCount;
  }

  allShipsSunk() {
    return this.remainingShips() === 0;
  }

  display() {
    console.log("Ships:");
    console.table(this.#shipsBoard);
    console.log("Attacks:");
    console.table(this.#attacksBoard);
  }
}

export default Gameboard;
