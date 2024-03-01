const GameBoard = (function () {
  let board = ["O", "O", "O", "", "", "", "", "", ""];

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
  const playerOne = Player("aymane", "X", 0);
  const playerTwo = Player("saigou", "O", 2);

  let activePlayer = playerOne;

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

  //winning condition
  let winningCondition = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal
    [2, 4, 6], // Diagonal
  ];

  const checkWinner = function () {
    for (comb of winningCondition) {
      if (
        gameBoard[comb[0]] === "X" &&
        gameBoard[comb[1]] === "X" &&
        gameBoard[comb[2]] === "X"
      ) {
        console.log(`${activePlayer.getName()} has won!`);
      } else if (
        gameBoard[comb[0]] === "O" &&
        gameBoard[comb[1]] === "O" &&
        gameBoard[comb[2]] === "O"
      ) {
        console.log(`${activePlayer.getName()} has won!`);
      }
    }
  };

  return { switchTurn, getActivePlayer, addSignToCell, checkWinner };
};

GameController();
