/**
 * game.js
 * This file is the core of the multiplayer Sudoku game, responsible for managing the game state,
 * controlling game flow, checking win/lose conditions, and implementing custom algorithms and interactions.
 */
export function handleWin(winningPlayer) {
  console.log(winningPlayer)
  // Display a personalized win message
  showWinModal(`Amazing job, ${winningPlayer.name}! You've solved the puzzle!`);

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

function showWinModal(message) {
  const modal = document.createElement('div');
  modal.className = 'win-modal';
  modal.innerHTML = `
    <h2>${message}</h2>
    <button onclick="location.reload()">Play Again</button>
    <button onclick="returnToMainMenu()">Main Menu</button>`;
  document.body.appendChild(modal);
}
