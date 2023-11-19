/**
 * Note: This project is organized within a single JavaScript file to avoid CORS issues 
 * when running directly from the file system without a local web server. 
 * For this reason, ES6 import/export features are not used here.
 * Functions and code blocks are organized to maintain some level of modularity.
 * 
 * Future Iteration: In Assignment 3, the codebase will be 
 * refactored to use multiple JavaScript files for better modularity and readability.
 */

import { canPlaceNumber, generateSudokuPuzzle, isBoardSolved, isCorrectPlacement } from "./board.js";
import { handleWin, resetGame, triggerConfetti } from "./game.js";
import { switchPlayer, getCurrentPlayer, initializePlayers, updateScore, togglePlayer, currentPlayer, setPlayerNames, players } from './player.js';
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
                triggerConfetti();
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
            if (isBoardSolved(gridState)) {
              handleWin(getCurrentPlayer()); // Handle the win scenario
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


document.getElementById('end-turn-player1').style.display = 'none';
document.getElementById('end-turn-player2').style.display = 'none';
document.getElementById('reset-game').addEventListener('click', resetGame);



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

document.getElementById('start-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const playerName1 = document.getElementById('player1-name').value;
  const playerName2 = document.getElementById('player2-name').value;

  const difficulty = document.getElementById('difficulty').value;
  // Initialize game with these values
  // Hide initial form and show the Sudoku board
  document.getElementById('initial-page').style.display = 'none';
  document.getElementById('game-screen').style.display = 'flex';
  initializeGame(playerName1, playerName2, difficulty);

});

function initializeGame(playerName1, playerName2, difficulty){  
  let generatedPuzzle = generateSudokuPuzzle(1);
  initializePlayers();
  setPlayerNames(playerName1, playerName2);

  document.getElementById('player1-name-display').textContent = players.player1.name || 'Player 1';
  document.getElementById('player2-name-display').textContent = players.player2.name || 'Player 2';

  initGameGrid(generatedPuzzle);

  // Event listeners for starting the game and toggling players
  document.getElementById("start-game").addEventListener("click", function () {
    togglePlayer();
    document.getElementById("start-game").style.display = "none";

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

};

//score multiplier
//have like pom pom on correct guesses
//Keep track of numbers
//disable buttons when not possible to use
//Add number of mistakes, corrrect, and whatever
