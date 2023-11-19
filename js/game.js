/**
 * game.js
 * This file is the core of the multiplayer Sudoku game, responsible for managing the game state,
 * controlling game flow, checking win/lose conditions, and implementing custom algorithms and interactions.
 */
import { players } from "./player.js";
export function handleWin(winningPlayer) {
  console.log(winningPlayer)
  const overallWinner = determineOverallWinner();

  // Display a personalized win message
  showWinModal(`Amazing job, ${winningPlayer.name}! You've solved the puzzle!`, overallWinner);

  // Animate the game board with a celebratory effect
  const gameBoard = document.getElementById('main-sudoku-grid');
  gameBoard.classList.add('win-animation');

  // Trigger confetti or particle effects
  triggerConfetti();
}
// Function to reset the game
export function resetGame() {
  // Reload the page to restart the whole game
  location.reload();
}
// Function to determine the overall winner based on score
function determineOverallWinner() {
  // Assuming you have access to players' scores
  if (players.player1.score > players.player2.score) {
    return players.player1.name;
  } else if (players.player1.score < players.player2.score) {
    return players.player2.name;
  } else {
    return 'It\'s a tie!';
  }
}
export function triggerConfetti() {
  const confettiContainer = document.createElement('div');
  confettiContainer.className = 'confetti-container';

  for (let i = 0; i < 100; i++) { // 10 pieces of confetti
    const confettiPiece = document.createElement('div');
    confettiPiece.className = 'confetti-piece';
    confettiContainer.appendChild(confettiPiece);
  }

  document.body.appendChild(confettiContainer);

  // Remove confetti after it falls
  setTimeout(() => confettiContainer.remove(), 8000); // Duration should match longest confetti animation
}
function showWinModal(lastTileMessage, overallWinnerMessage) {
  let winnerMessage = overallWinnerMessage === 'It\'s a tie!' 
                      ? 'The game is tied!' 
                      : `The final winner is ${overallWinnerMessage}!`;

  const modal = document.createElement('div');
  modal.className = 'win-modal';
  modal.innerHTML = `
    <h2>${lastTileMessage}</h2>
    <p style="font-size: 20px; font-weight: bold; margin-top: 10px;">${winnerMessage}</p>
    <button onclick="location.reload()">Play Again</button>
    <button onclick="location.reload()">Main Menu</button>`;
  document.body.appendChild(modal);
}
