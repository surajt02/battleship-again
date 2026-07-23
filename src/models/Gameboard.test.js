import Gameboard from "./Gameboard";
import Ship from "./Ship";

describe("Gameboard constructor", () => {
  const gameboard = new Gameboard(10);

  it("should create a Gameboard instance", () => {
    expect(gameboard).toBeDefined();
  });

  it("should have a size", () => {
    expect(gameboard.size).toBe(10);
  });

  it("should have a recieveAttack method", () => {
    expect(gameboard.recieveAttack).toBeDefined();
  });

  it("should have a placeShip method", () => {
    expect(gameboard.placeShip).toBeDefined();
  });

  it("should have a display method", () => {
    expect(gameboard.display).toBeDefined();
  });
});

describe("Gameboard Ship Placement", () => {
  let gameboard;
  let hShip;
  let vShip;

  beforeEach(() => {
    gameboard = new Gameboard(10);
    hShip = new Ship("Cruiser", 3);
    vShip = new Ship("Cruiser", 3);
  });

  it("should place a ship on the board horizontally", () => {
    gameboard.placeShip(hShip, 0, 0, "horizontal");
    gameboard.display();
  });

  it("should place a ship on the board vertically", () => {
    gameboard.placeShip(vShip, 0, 0, "vertical");
    gameboard.display();
  });

  it("should return false when placing a ship out of bounds", () => {
    expect(gameboard.placeShip(hShip, 0, 9, "horizontal")).toBe(false);
  });

  it("should return false when placing a ship on top of another", () => {
    gameboard.placeShip(hShip, 0, 0, "horizontal");
    expect(gameboard.placeShip(vShip, 0, 0, "vertical")).toBe(false);
  });

  it("should increment the number of ships", () => {
    gameboard.placeShip(hShip, 0, 0, "horizontal");
    gameboard.placeShip(vShip, 2, 0, "vertical");
    expect(gameboard.remainingShips()).toBe(2);
  });
});

describe("Gameboard Ship Attack", () => {
  let gameboard;

  beforeEach(() => {
    gameboard = new Gameboard(10);
  });

  it("should mark a miss on the attacks board", () => {
    let ship = new Ship("Cruiser", 3);
    gameboard.placeShip(ship, 0, 1, "horizontal");
    gameboard.recieveAttack(0, 0);
    gameboard.display();
  });

  it("should mark a hit on the attacks board", () => {
    let ship = new Ship("Cruiser", 3);
    gameboard.placeShip(ship, 0, 1, "horizontal");
    gameboard.recieveAttack(0, 1);
    gameboard.display();
  });

  it("should hit the ship on a successful attack", () => {
    let ship = new Ship("Cruiser", 3);
    gameboard.placeShip(ship, 0, 1, "horizontal");
    gameboard.recieveAttack(0, 1);
    gameboard.display();
    expect(ship.health()).toBe(2);
  });

  it("should sink the ship on a successful attack", () => {
    let ship = new Ship("Cruiser", 3);
    gameboard.placeShip(ship, 0, 1, "horizontal");
    gameboard.recieveAttack(0, 1);
    gameboard.recieveAttack(0, 2);
    gameboard.recieveAttack(0, 3);
    gameboard.display();
    expect(ship.isSunk()).toBe(true);
  });

  it("should increment remainingShips on ship placement", () => {
    let ship = new Ship("Cruiser", 3);
    gameboard.placeShip(ship, 0, 1, "horizontal");
    expect(gameboard.remainingShips()).toBe(1);
  });

  it("should decrement remainingShips on ship sink", () => {
    let ship = new Ship("Cruiser", 3);
    gameboard.placeShip(ship, 0, 1, "horizontal");
    gameboard.recieveAttack(0, 1);
    gameboard.recieveAttack(0, 2);
    gameboard.recieveAttack(0, 3);
    expect(gameboard.remainingShips()).toBe(0);
  });

  it("should detect all ships are sunk", () => {
    let ship1 = new Ship("Cruiser", 3);
    let ship2 = new Ship("Destroyer", 2);
    gameboard.placeShip(ship1, 0, 1, "horizontal");
    gameboard.placeShip(ship2, 1, 0, "vertical");
    gameboard.recieveAttack(0, 1);
    gameboard.recieveAttack(0, 2);
    gameboard.recieveAttack(0, 3);
    gameboard.recieveAttack(1, 0);
    gameboard.recieveAttack(2, 0);
    gameboard.display();
    expect(gameboard.allShipsSunk()).toBe(true);
  });
});
