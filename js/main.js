/**
 * Note: This project is organized within a single JavaScript file to avoid CORS issues 
 * when running directly from the file system without a local web server. 
 * For this reason, ES6 import/export features are not used here.
 * Functions and code blocks are organized to maintain some level of modularity.
 * 
 * Future Iteration: In Assignment 3, the codebase will be 
 * refactored to use multiple JavaScript files for better modularity and readability.
 */

import { canPlaceNumber, generateSudokuPuzzle, isCorrectPlacement } from "./board.js";
import { switchPlayer, getCurrentPlayer, initializePlayers, updateScore } from './player.js';

const cells = document.querySelectorAll('.sudoku-cell');
let selectedCell = null;
let selectedNumber = null; // Variable to keep track of the selected number
let gridState; // To keep track of the current Sudoku grid state
let selectedNumberElement = null; // Keep track of the DOM element for the selected number


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
      
      // Cell click event listener
      cell.addEventListener('click', function() {
        // Check if the cell is not a fixed part of the puzzle
        if (!this.classList.contains('fixed')) {
            // Remove highlighting from the previously selected cell
            if (selectedCell) {
                selectedCell.classList.remove('highlighted-cell');
            }
            // Highlight this cell
            selectedCell = this;
            selectedCell.classList.add('highlighted-cell');

            // Place the selected number if it's valid
            if (selectedNumber !== null) {
                if (canPlaceNumber(gridState, rowIndex, colIndex, selectedNumber)) {
                    this.textContent = selectedNumber;
                    gridState[rowIndex][colIndex] = selectedNumber;
                    if (isCorrectPlacement(gridState, rowIndex, colIndex, selectedNumber)) {
                      // Award points for correct placement
                      console.log("Correct placement!");
                  } else {
                      // Maybe less points or a different action
                      console.log("Valid move, but not the correct number for the solution.");
                  }
                } else {
                    console.log("Invalid move!");
                }
            }
        }
      });

      gridContainer.appendChild(cell);
    });
  });
  // Update gridState to reflect the current state of the puzzle
  gridState = puzzle.map(row => row.slice());
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

document.querySelectorAll('.number').forEach((numberElement) => {
  numberElement.addEventListener('click', () => {
      if (selectedNumberElement) {
          selectedNumberElement.classList.remove('selected-number');
      }
      selectedNumber = parseInt(numberElement.textContent);
      selectedNumberElement = numberElement;
      selectedNumberElement.classList.add('selected-number');
  });
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
    let generatedPuzzle = generateSudokuPuzzle(30);
    initializePlayers();

    initGameGrid(generatedPuzzle);

    // Event listeners for starting the game and toggling players
    document.getElementById("start-game").addEventListener("click", function() {
        interval1 = startTimer("player1", time1);
    });

    document.getElementById("end-turn-player1").addEventListener("click", togglePlayer);
    document.getElementById("end-turn-player2").addEventListener("click", togglePlayer);

    // Event listeners for number buttons
    document.querySelectorAll('.number').forEach((numberElement) => {
        numberElement.addEventListener('click', () => {
            if (selectedNumberElement) {
                selectedNumberElement.classList.remove('selected-number');
            }
            selectedNumber = parseInt(numberElement.textContent);
            selectedNumberElement = numberElement;
            selectedNumberElement.classList.add('selected-number');
        });
    });

});