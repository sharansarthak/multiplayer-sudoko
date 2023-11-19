/**
 * timer.js
 * This file is responsible for handling all timer-related functionalities in the game.
 * It includes setting up the timer, pausing, resuming, and resetting it, as well as executing actions when time runs out.
 */

import { updatePlayerTimer } from "./player.js";

/**
 * Initializes and starts the timer for a player.
 * @param {String} playerId - The ID of the player ("player1" or "player2").
 * @param {Number} initialTime - Initial time in seconds.
 */
// timer.js
function startTimer(playerId, remainingTime) {
  let startTime = Date.now();
  const timerElement = document.getElementById(`${playerId}-timer`);
  let intervalId = setInterval(() => {
      let elapsed = Math.floor((Date.now() - startTime) / 1000);
      let remaining = remainingTime - elapsed;

      updatePlayerTimer(playerId, remaining);

      const minutes = Math.floor(remaining / 60);
      const seconds = remaining % 60;
      timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

      if (remaining <= 0) {
          clearInterval(intervalId);
          // Callback when time runs out
      }
  }, 1000); // Run the interval every second

  return intervalId;
}

function stopTimer(intervalId) {
  clearInterval(intervalId);
}

export { startTimer, stopTimer };