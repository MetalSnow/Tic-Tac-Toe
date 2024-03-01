const GameBoard = (function () {
  let board = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  const getBoard = () => board;

  return { getBoard };
})();

const Player = function (name, choice, position) {
  const getName = () => name;
  const getChoice = () => choice;
  let isPosition = position;

  return { getName, getChoice, isPosition };
};

const GameController = function () {
  let gameBoard = GameBoard.getBoard();
  const playerOne = Player("aymane", 1, 0);
  const playerTwo = Player("saigou", 2, 2);

  let activePlayer = playerTwo;

  const switchTurn = () => {
    activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
  };

  const getActivePlayer = () => activePlayer;

  const addSignToCell = function () {
    if (gameBoard.getBoard()[activePlayer.isPosition] !== "") {
      return;
    } else {
      gameBoard
        .getBoard()
        .splice(activePlayer.isPosition, 1, activePlayer.getChoice());
      switchTurn();
    }
  };

  const gameWinner = function () {};

  return { switchTurn, getActivePlayer, addSignToCell };
};
