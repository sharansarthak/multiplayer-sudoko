const cells = document.querySelectorAll('.sudoku-cell');

const initGameGrid = () => {
    let index = 0;
    for (let i = 0; i < 81; i++) {
        let row = Math.floor(i / 9);
        let col = i % 9;
        if (row === 2 || row === 5) cells[index].style.marginBottom = '10px';
        if (col === 2 || col === 5) cells[index].style.marginRight = '10px';
        index++;
    }
}
function startTimer(playerId) {
  let time = 600; // 10 minutes in seconds
  const timerElement = document.getElementById(`${playerId}-timer`);
  
  const interval = setInterval(() => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    
    if (time <= 0) {
      clearInterval(interval);
      // Handle what happens when time runs out
    }
    
    time--;
  }, 1000);
}


startTimer('player1');
startTimer('player2');

initGameGrid();
