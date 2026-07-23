import Player from "./Player";
import Gameboard from "./Gameboard";

describe("Player constructor", () => {
  it("should create a human player with a name", () => {
    let player = new Player("player1", "human");
    expect(player.name).toBe("player1");
    expect(player.type).toBe("human");
  });

  it("should create a computer player with a name", () => {
    let player = new Player("player2", "computer");
    expect(player.name).toBe("player2");
    expect(player.type).toBe("computer");
  });

  it("should create a new player with its own Gameboard", () => {
    let player = new Player("player1", "human", new Gameboard(10));
    expect(player.gameboard).toBeDefined();
    expect(player.gameboard.size).toBe(10);
  });
});
