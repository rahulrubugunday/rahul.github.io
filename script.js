const gridSize = 5;
const board = document.getElementById("board");
const winMessage = document.getElementById("win-message");
const moveCounterEl = document.getElementById("move-counter");
const targetMovesEl = document.getElementById("target-moves");
const timerEl = document.getElementById("timer");
const resetBtn = document.getElementById("reset-btn");

let grid = [];
let moves = 0;
let targetMoves = 0;
let timer = 0;
let timerInterval;

// Create the grid
function createGrid() {
  grid = [];
  board.innerHTML = ""; // Clear any existing grid
  for (let row = 0; row < gridSize; row++) {
    const rowCells = [];
    for (let col = 0; col < gridSize; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = row;
      cell.dataset.col = col;
      board.appendChild(cell);
      rowCells.push(cell);

      // Add click event
      cell.addEventListener("click", () => handleCellClick(row, col));
    }
    grid.push(rowCells);
  }
}

// Handle cell click
function handleCellClick(row, col) {
    toggleLights(row, col); // Toggle the clicked cell and neighbors
    moves++;
    moveCounterEl.textContent = moves;
  
    // Check win condition
    if ($("#board .cell:(.is-off)").length === 0) { // All tiles are black
      clearInterval(timerInterval); // Stop the timer
      winMessage.style.display = "block"; // Show win message
    }
}
  

// Toggle a cell and its neighbors
function toggleLights(row, col) {
    const toggleCell = (r, c) => {
      if (r >= 0 && r < gridSize && c >= 0 && c < gridSize) {
        grid[r][c].classList.toggle("is-off");
      }
    };
  
    toggleCell(row, col); // Current cell
    toggleCell(row - 1, col); // Above
    toggleCell(row + 1, col); // Below
    toggleCell(row, col - 1); // Left
    toggleCell(row, col + 1); // Right
}
  

// Randomize the board with a solvable configuration
function randomizeBoard() {
  const randomClicks = Math.floor(Math.random() * 15) + 10; // 10-25 random moves
  targetMoves = randomClicks;
  targetMovesEl.textContent = targetMoves;

  for (let i = 0; i < randomClicks; i++) {
    const randomRow = Math.floor(Math.random() * gridSize);
    const randomCol = Math.floor(Math.random() * gridSize);
    toggleLights(randomRow, randomCol);
  }
}

// Check if all cells are off
function checkWin() {
  const allOff = grid.flat().every(cell => cell.classList.contains("is-off"));
  if (allOff) {
    clearInterval(timerInterval); // Stop the timer
    winMessage.style.display = "block";
  }
}

// Timer logic
function startTimer() {
  timer = 0;
  timerEl.textContent = timer;
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timer++;
    timerEl.textContent = timer;
  }, 1000);
}

// Reset game
function resetGame() {
  clearInterval(timerInterval); // Stop the timer
  initGame(); // Reinitialize the game
}

function checkWin() {
    const allOff = grid.flat().every(cell => cell.classList.contains("is-off"));
    if (allOff) {
      clearInterval(timerInterval); // Stop the timer
      winMessage.style.display = "block";
    }
  }
  

// Initialize game
function initGame() {
  moves = 0;
  moveCounterEl.textContent = moves;
  winMessage.style.display = "none";

  createGrid();
  randomizeBoard();
  startTimer();
}

// Add event listener for reset button
resetBtn.addEventListener("click", resetGame);

// Start the game for the first time
initGame();
