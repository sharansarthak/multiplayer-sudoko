/**
 * Note: This project is organized within a single JavaScript file to avoid CORS issues 
 * when running directly from the file system without a local web server. 
 * For this reason, ES6 import/export features are not used here.
 * Functions and code blocks are organized to maintain some level of modularity.
 * 
 * Future Iteration: In Assignment 3, the codebase will be 
 * refactored to use multiple JavaScript files for better modularity and readability.
 */

import { canPlaceNumber, generateSudokuPuzzle } from "./board.js";

const cells = document.querySelectorAll('.sudoku-cell');
let selectedCell = null;
let selectedNumber = null; // Variable to keep track of the selected number
let gridState; // To keep track of the current Sudoku grid state


// Initialize the game grid dynamically
const initGameGrid = (puzzle) => {
  const gridContainer = document.getElementById('main-sudoku-grid');
  gridContainer.innerHTML = ''; // Clear existing cells if any

  puzzle.forEach((row, rowIndex) => {
    row.forEach((value, colIndex) => {
      const cell = document.createElement('div');
      cell.classList.add('sudoku-cell');
      
      if (value !== 0) {
          cell.textContent = value;
          cell.classList.add('fixed'); // Mark the cell as fixed
      }

      // Styling for visual separation of Sudoku blocks
      if (rowIndex % 3 === 2) cell.style.marginBottom = '10px';
      if (colIndex % 3 === 2) cell.style.marginRight = '10px';
      
      cell.addEventListener('click', function() {
        if (!this.classList.contains('fixed')) {
            if (selectedCell) {
                selectedCell.classList.remove('highlighted-cell');
            }
            selectedCell = this;
            selectedCell.classList.add('highlighted-cell');

            if (selectedNumber !== null) {
                if (canPlaceNumber(gridState, rowIndex, colIndex, selectedNumber)) {
                    this.textContent = selectedNumber;
                    gridState[rowIndex][colIndex] = selectedNumber;
                } else {
                    console.log("Invalid move!");
                }
            }
        }
    });
    

    gridContainer.appendChild(cell);;
    });
  });
  gridState = puzzle.map(row => row.slice()); // Clone the puzzle array

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
    selectedCell.classList.add('selected-number');
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


document.addEventListener("DOMContentLoaded", () => {
  // Assuming a medium difficulty level for the generated puzzle
  let generatedPuzzle = generateSudokuPuzzle(30); // You can adjust the difficulty level
  
  initGameGrid(generatedPuzzle); // Initialize the game grid with the generated puzzle

  // Event listeners for starting the game and toggling players
  document.getElementById("start-game").addEventListener("click", function() {
    interval1 = startTimer("player1", time1);
  });

  document.getElementById("end-turn-player1").addEventListener("click", togglePlayer);
  document.getElementById("end-turn-player2").addEventListener("click", togglePlayer);
  document.querySelectorAll('.number').forEach((numberElement) => {
    numberElement.addEventListener('click', () => {
        selectedNumber = parseInt(numberElement.textContent);
    });
});
});

document.querySelectorAll('.sudoku-cell').forEach((cell, index) => {
  cell.addEventListener('click', () => {
      const row = Math.floor(index / 9);
      const col = index % 9;

      // Check if the number can be placed
      if (canPlaceNumber(grid, row, col, selectedCell)) {
          cell.textContent = selectedCell;
          grid[row][col] = selectedCell; // Update your grid state
      } else {
          // Handle invalid move (e.g., show alert or error message)
          console.log("Invalid move!");
      }
  });
});