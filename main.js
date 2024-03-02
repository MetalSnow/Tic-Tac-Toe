const GameBoard = (function () {
  let board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;

  return { getBoard };
})();

const Player = function (name, choice) {
  const getName = () => name;
  const getChoice = () => choice;

  return { getName, getChoice };
};

const GameController = function () {
  const gameBoard = GameBoard.getBoard();

  const startDiv = document.querySelector(".start-game");
  const inputOne = document.querySelector("#player-one").value;
  const inputTwo = document.querySelector("#player-two").value;
  const turn = document.querySelector(".turn");
  const stats = document.querySelector(".stats");

  //initialize Game
  function startGame() {
    //Create Players
    const playerOne = Player(inputOne, "X");
    const playerTwo = Player(inputTwo, "O");

    turn.textContent = `--${playerOne.getName()}'s Turn--`;
    stats.textContent = `${playerOne.getName()}(${playerOne.getChoice()}) VS ${playerTwo.getName()}(${playerTwo.getChoice()})`;
    startDiv.classList.add("active");
  }

  let activePlayer = playerOne;

  const switchTurn = () => {
    activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
  };

  const getActivePlayer = () => activePlayer;

  const addSignToCell = function (cell) {
    if (gameBoard[cell] !== "") {
      return;
    } else {
      gameBoard.splice(cell, 1, activePlayer.getChoice());
      turn.textContent = `--${playerTwo.getName()}'s Turn--`;
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
    console.log(gameBoard);
    for (comb of winningCondition) {
      if (
        gameBoard[comb[0]] === "X" &&
        gameBoard[comb[1]] === "X" &&
        gameBoard[comb[2]] === "X"
      ) {
        console.log(`${activePlayer.getName()} 1 has won!`);
      } else if (
        gameBoard[comb[0]] === "O" &&
        gameBoard[comb[1]] === "O" &&
        gameBoard[comb[2]] === "O"
      ) {
        console.log(`${activePlayer.getName()} 2 has won!`);
      } else if (!gameBoard.includes("")) {
        return console.log("It's A Tie");
      }
    }
  };

  return { getActivePlayer, addSignToCell, checkWinner, startGame };
};

const DisplayController = function () {
  const gameBoard = GameBoard.getBoard();
  const game = GameController();

  const renderBoard = () => {
    //Get DOM Elements
    const startBtn = document.querySelector("#start");
    const boardDiv = document.querySelector(".game-board");

    //Initialize game
    startBtn.addEventListener("click", game.startGame);

    //Create Board
    for (let i = 0; i < gameBoard.length; i++) {
      let cell = document.createElement("button");

      cell.classList.add("cell");
      cell.dataset.index = i;

      cell.addEventListener("click", () => {
        game.addSignToCell(i);
        cell.textContent = gameBoard[i];
        console.log(gameBoard);
      });
      boardDiv.appendChild(cell);
    }
  };

  renderBoard();
};

DisplayController();
