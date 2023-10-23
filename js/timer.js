let interval1, interval2;
let time1 = 600, time2 = 600;  // Initialize remaining time for both players

export function startTimer(playerId, remainingTime) {
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