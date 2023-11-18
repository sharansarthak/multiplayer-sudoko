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
  if (players[playerKey]) {
    players[playerKey].score += points;
    console.log(`${playerKey} score: ${players[playerKey].score}`);
    // Optionally update the UI here
  }
}

// Function to get the score of a player
function getPlayerScore(playerKey) {
  return players[playerKey] ? players[playerKey].score : 0;
}

// Function to toggle between players, managing timers
function togglePlayer() {
  const timerElement1 = document.getElementById("player1-timer");
  const timerElement2 = document.getElementById("player2-timer");


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
export { switchPlayer, getCurrentPlayer, initializePlayers, updateScore, togglePlayer, getPlayerScore, updatePlayerTimer, players };
