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
import { switchPlayer, getCurrentPlayer, initializePlayers, updateScore, togglePlayer, currentPlayer } from './player.js';
import { startTimer } from "./timer.js";

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
      cell.addEventListener('click', function () {
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
                updateScore(currentPlayer, 100);
                console.log("Correct placement!");
                selectedCell.classList.add('correct-move');
                setTimeout(() => selectedCell.classList.remove('correct-move'), 1000);

              } else {
                updateScore(currentPlayer, 80);
                selectedCell.classList.add('valid-but-incorrect');
setTimeout(() => selectedCell.classList.remove('valid-but-incorrect'), 1000);
                console.log("Valid move, but not the correct number for the solution.");
              }
            } else {
              updateScore(currentPlayer, -50);
              console.log("Invalid move!");
              selectedCell.classList.add('incorrect-move');
setTimeout(() => selectedCell.classList.remove('incorrect-move'), 500);
            }
            togglePlayer();
          }
        }
      });

      gridContainer.appendChild(cell);
    });
  });
  // Update gridState to reflect the current state of the puzzle
  gridState = puzzle.map(row => row.slice());
};

let interval1, interval2;
let time1 = 600, time2 = 600;  // Initialize remaining time for both players
let isFirstStart = true;  // Initialize a variable to track the first start



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


document.addEventListener("DOMContentLoaded", () => {
  let generatedPuzzle = generateSudokuPuzzle(30);
  initializePlayers();

  initGameGrid(generatedPuzzle);

  // Event listeners for starting the game and toggling players
  document.getElementById("start-game").addEventListener("click", function () {
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

