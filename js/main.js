/**
 * Note: This project is organized within a single JavaScript file to avoid CORS issues 
 * when running directly from the file system without a local web server. 
 * For this reason, ES6 import/export features are not used here.
 * Functions and code blocks are organized to maintain some level of modularity.
 * 
 * Future Iteration: In Assignment 3, the codebase will be 
 * refactored to use multiple JavaScript files for better modularity and readability.
 */

const cells = document.querySelectorAll('.sudoku-cell');
let selectedCell = null; // To keep track of which cell is selected

// Sample Sudoku board, replace with your own numbers
const sampleBoard = [
  5, 3, 0, 0, 7, 0, 0, 0, 0,
  6, 0, 0, 1, 9, 5, 0, 0, 0,
  0, 9, 8, 0, 0, 0, 0, 6, 0,
  8, 0, 0, 0, 6, 0, 0, 0, 3,
  4, 0, 0, 8, 0, 3, 0, 0, 1,
  7, 0, 0, 0, 2, 0, 0, 0, 6,
  0, 6, 0, 0, 0, 0, 2, 8, 0,
  0, 0, 0, 4, 1, 9, 0, 0, 5,
  0, 0, 0, 0, 8, 0, 0, 7, 9
];

// Initialize the game grid dynamically
const initGameGrid = () => {
  const gridContainer = document.getElementById('main-sudoku-grid');

  for (let i = 0; i < 81; i++) {
      const cell = document.createElement('div');
      cell.classList.add('sudoku-cell');

      // Pre-fill cell with sampleBoard values
      if (sampleBoard[i] !== 0) {
          cell.textContent = sampleBoard[i];
      }

      const row = Math.floor(i / 9);
      const col = i % 9;

      if (row === 2 || row === 5) {
          cell.style.marginBottom = '10px';
      }
      if (col === 2 || col === 5) {
          cell.style.marginRight = '10px';
      }
      cell.addEventListener('click', function() {
        this.classList.toggle('highlighted-cell');
      });
      gridContainer.appendChild(cell);
      gridContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('sudoku-cell')) {
          selectedCell = event.target; // Set the selected cell
        }
      });
  }
};
let currentPlayer = "player1";
let interval1, interval2;
let time1 = 600, time2 = 600;  // Initialize remaining time for both players
let isFirstStart = true;  // Initialize a variable to track the first start

function startTimer(playerId, remainingTime) {
  let startTime = Date.now();
  const timerElement = document.getElementById(`${playerId}-timer`);
  
  return setInterval(() => {
    let elapsed = Math.floor((Date.now() - startTime) / 1000);
    let remaining = remainingTime - elapsed;
    
    if (playerId === "player1") {
      time1 = remaining;
    } else {
      time2 = remaining;
    }

    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;
    timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    
    if (remaining <= 0) {
      clearInterval(interval1);
      clearInterval(interval2);
      // Handle what happens when time runs out
    }
  }, 100);
}

// Function to fill the selected cell with a number
function fillNumber(event) {
  if (selectedCell) {
    selectedCell.textContent = event.target.textContent;
    selectedCell.classList.add('selected-number'); // Add class to change the color
  }
}
// Add click events to the number buttons
document.querySelectorAll('.number').forEach((numberElement) => {
  numberElement.addEventListener('click', fillNumber);
});

//Changing player which they end their turn
function togglePlayer() {
  const timerElement1 = document.getElementById("player1-timer");
  const timerElement2 = document.getElementById("player2-timer");

  if (currentPlayer === "player1") {
    timerElement1.classList.remove('pulse-timer');
    timerElement2.classList.add('pulse-timer');
  
    clearInterval(interval1);
    currentPlayer = "player2";
    interval2 = startTimer("player2", time2);
  } else {
    timerElement2.classList.remove('pulse-timer');
    timerElement1.classList.add('pulse-timer');
  
    clearInterval(interval2);
    currentPlayer = "player1";
    interval1 = startTimer("player1", time1);
  }
}


document.addEventListener("DOMContentLoaded", (event) => {
  document.getElementById("start-game").addEventListener("click", function() {
    interval1 = startTimer("player1", time1);
  });

  document.getElementById("end-turn-player1").addEventListener("click", togglePlayer);
  document.getElementById("end-turn-player2").addEventListener("click", togglePlayer);

  initGameGrid();
});
