const cells = document.querySelectorAll('.sudoko-cell');

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
initGameGrid();
