/**
 * players.js
 * This file is responsible for managing player states and interactions.
 * It includes functionalities like toggling between players, managing player timers,
 * and handling player-specific animations and events.
 */
let players = {
  player1: { name: "Player 1", color: "blue", score: 0, timeId: null, timeRemaining: 600 },
  player2: { name: "Player 2", color: "pink", score: 0, timeId: null, timeRemaining: 600 }
};

let currentPlayer = "player1";
// Function to set player names
function setPlayerNames(name1, name2) {
  players.player1.name = name1;
  players.player2.name = name2;
}
// Import timer functions from timer.js
import { startTimer, stopTimer } from './timer.js';

// Function to switch the current player
function switchPlayer() {
  currentPlayer = (currentPlayer === "player1") ? "player2" : "player1";
}

// Function to get  current player object
function getCurrentPlayer() {
  return players[currentPlayer];
}

// Function to initialize players
function initializePlayers() {
  players.player1.score = 0;
  players.player2.score = 0;
  players.player1.name = "Alice";
  players.player2.name = "Bob";
  players.player1.color = "blue";
  players.player2.color = "pink";
  players.player1.timeRemaining = 600; 
  players.player2.timeRemaining = 600;
}

// Function to update the timer details for a player
function updatePlayerTimer(playerKey, newTimerValue) {
  if (players[playerKey]) {
    // Update the timer with the new value
    players[playerKey].timeRemaining = newTimerValue;

  }
}

// Function to update the score of a player
function updateScore(playerKey, points) {
  console.log(`Attempting to update score for ${playerKey}. Points to add: ${points}`);

  if (players[playerKey]) {
    players[playerKey].score += points;
    const scoreElement = document.getElementById(`${playerKey}-score-value`);
    if (scoreElement) {
      scoreElement.textContent = players[playerKey].score;
      createAndShowFloatingPoints(playerKey, points, scoreElement);
    } else {
      console.log(`Score element not found for ${playerKey}`);
    }
  } else {
    console.log(`Player object not found for ${playerKey}`);
  }
}
  // Helper function to create and show floating points
// Helper function to create and show floating points
function createAndShowFloatingPoints(playerKey, points, scoreElement) {
  // Create new floating points element
  const floatingPoints = document.createElement('div');
  floatingPoints.textContent = points >= 0 ? `+${points}` : `${points}`;
  floatingPoints.className = 'enhanced-floating-points';
  document.body.appendChild(floatingPoints);

  // Adjust position
  const rect = scoreElement.getBoundingClientRect();
  floatingPoints.style.left = `${rect.left}px`;
  floatingPoints.style.top = `${rect.bottom + 130}px`;

  // Remove after animation
  setTimeout(() => floatingPoints.remove(), 4000); // Adjust the animation duration here
}







// Function to get the score of a player
function getPlayerScore(playerKey) {
  return players[playerKey] ? players[playerKey].score : 0;
}

// Function to toggle between players, managing timers
function togglePlayer() {
  const timerElement1 = document.getElementById("player1-timer");
  const timerElement2 = document.getElementById("player2-timer");

document.getElementById("player1-area").classList.toggle('active-player', currentPlayer === "player2");
document.getElementById("player2-area").classList.toggle('active-player', currentPlayer === "player1");
 // Logic to show/hide the 'End Turn' buttons
 document.getElementById("end-turn-player1").style.display = currentPlayer === "player1" ? 'none' : 'block';
 document.getElementById("end-turn-player2").style.display = currentPlayer === "player2" ? 'none' : 'block';

  if (currentPlayer === "player1") {
    stopTimer(players.player1.timeId); // Correctly stopping the current timer
    switchPlayer();
    players.player2.timeId = startTimer("player2", players.player2.timeRemaining); // Storing new interval ID
  } else {
    stopTimer(players.player2.timeId); // Correctly stopping the current timer
    switchPlayer();
    players.player1.timeId = startTimer("player1", players.player1.timeRemaining); // Storing new interval ID
  }
}

// Exporting the necessary functions and variables
export { setPlayerNames, switchPlayer, getCurrentPlayer, initializePlayers, updateScore, togglePlayer, getPlayerScore, updatePlayerTimer, players, currentPlayer };
