import './style.css';

const board = document.querySelector('.game-board');
const currentPlayerStatus = document.querySelector('.player-status');
const GameStatus = document.querySelector('.game-status');
const restartButton = document.getElementsByClassName('restart-button')[0];
let isGameActive = true;
const cellsSize = 9;

let gameState = new Array(cellsSize).fill('');
let currentPlayer = 'X';
currentPlayerStatus.innerText = `Current Player is ${currentPlayer}`;

const generateBoard = () => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < cellsSize; i++) {
    const cell = document.createElement('div');
    cell.setAttribute('data-index', i);
    cell.classList.add('game-cell');
    fragment.appendChild(cell);
  }

  board.appendChild(fragment);
};

const updateCurrentPlayer = () => {
  console.log(isGameActive);
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  currentPlayerStatus.innerText = isGameActive
    ? `Current Player is ${currentPlayer}`
    : '';
};

const validateGame = () => {
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  let isWon = false;

  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    const cell1 = gameState[a];
    const cell2 = gameState[b];
    const cell3 = gameState[c];
    if (cell1 === cell2 && cell2 === cell3 && cell1 !== '') {
      isWon = true;
      break;
    }
  }

  if (isWon) {
    isGameActive = false;
    GameStatus.innerText = `Game is won by Player ${currentPlayer}`;
    return;
  }

  const isDraw = gameState.filter(g => g === '').length === 0;
  if (isDraw) {
    isGameActive = false;
    GameStatus.innerText = `Game is drawn`;
    return;
  }
};

const handleCellClick = e => {
  const cell = e.target;
  const index = parseInt(cell.dataset.index);
  if (gameState[index] !== '' || !isGameActive) {
    return;
  }

  gameState[index] = currentPlayer;
  cell.innerText = currentPlayer;

  validateGame();
  updateCurrentPlayer();
};

const restartGame = () => {
  gameState = new Array(cellsSize).fill('');
  currentPlayer = 'X';
  document.querySelectorAll('.game-cell').forEach(cell => {
    cell.innerText = '';
  });
  isGameActive = true;
  GameStatus.innerText = '';
};

board.addEventListener('click', handleCellClick);
restartButton.addEventListener('click', restartGame);
generateBoard();
