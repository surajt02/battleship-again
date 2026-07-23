import Ship from "./Ship";

describe("Ship constructor", () => {
  let ship = new Ship("Carrier", 5);

  it("creates a Ship", () => {
    expect(ship).toBeDefined();
  });

  it("should have a name", () => {
    expect(ship.name).toBe("Carrier");
  });

  it("should have a length", () => {
    expect(ship.length).toBe(5);
  });

  it("should have health", () => {
    expect(ship.health).toBe(5);
  });

  it("should have a hit method", () => {
    expect(ship.hit).toBeDefined();
  });

  it("should have a isSunk method", () => {
    expect(ship.isSunk).toBeDefined();
  });
});

describe("Ship mechanics", () => {
  let testShip;

  beforeEach(() => {
    testShip = new Ship("Cruiser", 3);
  });

  it("starts with full health", () => {
    expect(testShip.health).toBe(3);
  });

  it("should take damage when hit", () => {
    testShip.hit();
    expect(testShip.health).toBe(2);
  });

  it("should be sunk when health reaches 0", () => {
    testShip.hit();
    testShip.hit();
    testShip.hit();
    expect(testShip.isSunk).toBe(true);
  });
});
