let board = ["", "", "", "", "", "", "", "", ""];
const humanPlayer = "X";
const computerPlayer = "O";
const winningCombinations = [  
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
let humanScore = 0;
let computerScore = 0;
let drawScore = 0;

function updateScore() {
    document.getElementById("human-score").textContent = humanScore;
    document.getElementById("computer-score").textContent = computerScore;
    document.getElementById("draw-score").textContent = drawScore;
  }

const newGameButton = document.getElementById("new-game");

newGameButton.addEventListener("click", function () {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = humanPlayer;
  document.querySelectorAll(".game-cell").forEach((cell) => (cell.textContent = ""));
});

function checkForWin(player) {
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (board[a] === player && board[b] === player && board[c] === player) {
      return true;
    }
  }
  return false;
}

function checkForDraw() {
  return !board.includes("");
}

function getEmptyCells() {
  return board.reduce((emptyCells, cell, index) => {
    if (!cell) {
      emptyCells.push(index);
    }
    return emptyCells;
  }, []);
}

function minimax(depth, player) {
  if (checkForWin(computerPlayer)) {
    return 10 - depth;
  }

  if (checkForWin(humanPlayer)) {
    return depth - 10;
  }

  if (checkForDraw()) {
    return 0;
  }

  const emptyCells = getEmptyCells();
  const scores = [];

  for (let i = 0; i < emptyCells.length; i++) {
    const cellIndex = emptyCells[i];
    board[cellIndex] = player;

    if (player === computerPlayer) {
      scores.push(minimax(depth + 1, humanPlayer));
    } else {
      scores.push(minimax(depth + 1, computerPlayer));
    }

    board[cellIndex] = "";
  }

  return player === computerPlayer ? Math.max(...scores) : Math.min(...scores);
}

function getBestMove() {
  const emptyCells = getEmptyCells();
  const moves = [];

  for (let i = 0; i < emptyCells.length; i++) {
    const cellIndex = emptyCells[i];
    board[cellIndex] = computerPlayer;
    const score = minimax(0, humanPlayer);
    board[cellIndex] = "";

    moves.push({ cellIndex, score });
  }

  moves.sort((a, b) => b.score - a.score);

  return moves[0].cellIndex;
}

let currentPlayer = humanPlayer;

function handleClick(event) {
  const cell = event.target;
  const cellIndex = parseInt(cell.id);

  if (board[cellIndex] || checkForWin(humanPlayer) || checkForWin(computerPlayer) || checkForDraw() || currentPlayer === computerPlayer) {
    return;
  }

  board[cellIndex] = humanPlayer;
  cell.textContent = humanPlayer;
  currentPlayer = computerPlayer;

  if (checkForWin(humanPlayer)) {
    alert(`You win!`);
    humanScore++;
    updateScore();
    return;
  }

  if (checkForDraw()) {
    alert("It's a draw!");
    return;
  }

  const computerMove = getBestMove();
  board[computerMove] = computerPlayer;
  document.getElementById(computerMove).textContent = computerPlayer;
  currentPlayer = humanPlayer;

  if (checkForWin(computerPlayer)) {
    alert(`Computer wins!`);
    computerScore++;
    updateScore();
    return;
  }

  if (checkForDraw()) {
    alert("It's a draw!");
    drawScore++;
    updateScore();
    return;
  }
}


  

document.querySelectorAll(".game-cell").forEach((button) => {
    button.addEventListener("click", handleClick);
  });
  



// const board = ["", "", "", "", "", "", "", "", ""];
// let currentPlayer = "X";
// const winningCombinations = [
//   [0, 1, 2],
//   [3, 4, 5],
//   [6, 7, 8],
//   [0, 3, 6],
//   [1, 4, 7],
//   [2, 5, 8],
//   [0, 4, 8],
//   [2, 4, 6],
// ];

// function checkForWin() {
//   for (let i = 0; i < winningCombinations.length; i++) {
//     const [a, b, c] = winningCombinations[i];
//     if (board[a] && board[a] === board[b] && board[a] === board[c]) {
//       return true;
//     }
//   }
//   return false;
// }

// function checkForDraw() {
//   return !board.includes("");
// }

// function handleClick(event) {
//   const cell = event.target;
//   const cellIndex = parseInt(cell.id) - 1;

//   if (board[cellIndex] || checkForWin() || checkForDraw()) {
//     return;
//   }

//   board[cellIndex] = currentPlayer;
//   cell.textContent = currentPlayer;

//   if (checkForWin()) {
//     alert(`Player ${currentPlayer} wins!`);
//     return;
//   }

//   if (checkForDraw()) {
//     alert("It's a draw!");
//     return;
//   }

//   currentPlayer = currentPlayer === "X" ? "O" : "X";
// }

// document.querySelectorAll("button").forEach((button) => {
//   button.addEventListener("click", handleClick);
// });
