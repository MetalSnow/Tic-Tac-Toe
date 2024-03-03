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
  const inputOne = document.querySelector("#player-one");
  const inputTwo = document.querySelector("#player-two");
  const turn = document.querySelector(".turn");
  const stats = document.querySelector(".stats");

  //Create Players
  let playerOne;
  let playerTwo;
  let activePlayer;

  //initialize Game
  const startGame = () => {
    playerOne = Player(inputOne.value.trim(), "X");
    playerTwo = Player(inputTwo.value.trim(), "O");

    // Check if inputs are not empty
    if (inputOne.value.trim() === "" || inputTwo.value.trim() === "") {
      alert("Please enter player names.");
      return;
    }

    turn.textContent = `--${playerOne.getName()}'s Turn--`;
    stats.textContent = `${playerOne.getName()}(${playerOne.getChoice()}) VS ${playerTwo.getName()}(${playerTwo.getChoice()})`;
    startDiv.classList.add("active");

    activePlayer = playerOne;
  };

  const switchTurn = () => {
    activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
  };

  const addSignToCell = function (cell) {
    if (gameBoard[cell] !== "") {
      return;
    } else {
      gameBoard.splice(cell, 1, activePlayer.getChoice());
      switchTurn();
      turn.textContent = `--${activePlayer.getName()}'s Turn--`;
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

  const checkWinner = function (para, dialog) {
    // Check For A Tie
    if (!gameBoard.includes("")) {
      switchTurn();
      para.textContent = `Its A Tie!`;
      dialog.showModal();
    }
    // Check for winner
    for (comb of winningCondition) {
      if (
        gameBoard[comb[0]] === "X" &&
        gameBoard[comb[1]] === "X" &&
        gameBoard[comb[2]] === "X"
      ) {
        switchTurn();
        para.textContent = `${activePlayer.getName()}(${activePlayer.getChoice()}) Has Won!`;
        dialog.showModal();
      } else if (
        gameBoard[comb[0]] === "O" &&
        gameBoard[comb[1]] === "O" &&
        gameBoard[comb[2]] === "O"
      ) {
        switchTurn();
        para.textContent = `${activePlayer.getName()}(${activePlayer.getChoice()}) Has Won!`;
        dialog.showModal();
      }
    }
  };

  // Reset board functions
  const rematch = function (cell, dialog) {
    for (let i = 0; i < gameBoard.length; i++) {
      gameBoard.splice(i, 1, "");
    }
    cell.textContent = "";
    startGame();
    dialog.close();
  };

  const restart = function (cell, dialog) {
    for (let i = 0; i < gameBoard.length; i++) {
      gameBoard.splice(i, 1, "");
    }

    cell.textContent = "";
    startDiv.classList.remove("active");
    inputOne.value = "";
    inputTwo.value = "";
    dialog.close();
  };
  return { addSignToCell, checkWinner, startGame, rematch, restart };
};

const DisplayController = (function () {
  const gameBoard = GameBoard.getBoard();
  const game = GameController();

  const renderBoard = () => {
    //Get DOM Elements
    const startBtn = document.querySelector("#start");
    const boardDiv = document.querySelector(".game-board");
    const dialog = document.querySelector("dialog");
    const para = document.querySelector(".p-dialog");
    const rematchBtn = document.querySelector("#rematch");
    const restartBtn = document.querySelector("#restart");

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
        game.checkWinner(para, dialog);
      });
      boardDiv.appendChild(cell);

      //reset board
      rematchBtn.addEventListener("click", () => {
        game.rematch(cell, dialog);
      });
      restartBtn.addEventListener("click", () => {
        game.restart(cell, dialog);
      });
    }
  };

  renderBoard();
})();
