const GRID_SIZE = 9;
const BOX_SIZE = 3;
const UNASSIGNED = 0;
const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// Assume 'solutionGrid' is the complete solution grid that you generate and store when the game starts.
let solutionGrid;
const initializeEmptyGrid = (size) => {
    let grid = [];
    for (let i = 0; i < size; i++) {
        grid.push(new Array(size).fill(UNASSIGNED));
    }
    return grid;
};

const isRowSafe = (grid, row, value) => {
    return grid[row].indexOf(value) === -1;
};

const isColSafe = (grid, col, value) => {
    return grid.every(row => row[col] !== value);
};

const isBoxSafe = (grid, boxStartRow, boxStartCol, value) => {
    for (let r = 0; r < BOX_SIZE; r++) {
        for (let c = 0; c < BOX_SIZE; c++) {
            if (grid[boxStartRow + r][boxStartCol + c] === value) {
                return false;
            }
        }
    }
    return true;
};

const isSafe = (grid, row, col, value) => {
    return isRowSafe(grid, row, value) &&
           isColSafe(grid, col, value) &&
           isBoxSafe(grid, row - row % BOX_SIZE, col - col % BOX_SIZE, value);
};

const findUnassignedLocation = (grid) => {
    for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
            if (grid[row][col] === UNASSIGNED) {
                return [row, col];
            }
        }
    }
    return null;
};

const shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
};

export function isBoardSolved(currentGrid) {
    for (let row = 0; row < currentGrid.length; row++) {
      for (let col = 0; col < currentGrid[row].length; col++) {
        if (currentGrid[row][col] === 0 || currentGrid[row][col] !== solutionGrid[row][col]) {
          return false;
        }
      }
    }
    return true;
  }
  
  
const sudokuCreate = (grid) => {
    let unassignedPos = findUnassignedLocation(grid);
    if (!unassignedPos) {
        return true; // Puzzle filled successfully
    }

    let [row, col] = unassignedPos;
    let numbers = shuffleArray([...NUMBERS]);
    for (let num of numbers) {
        if (isSafe(grid, row, col, num)) {
            grid[row][col] = num;

            if (sudokuCreate(grid)) {
                return true;
            }

            grid[row][col] = UNASSIGNED;
        }
    }
    return false; // Trigger backtracking
};

const removeCells = (grid, difficulty) => {
    let attempts;

    switch (difficulty) {
        case '1': // Easy
            attempts = 15; // Fewer cells removed for easy level
            break;
        case '2': // Medium
            attempts = 30; // More cells removed for medium level
            break;
        case '3': // Hard
            attempts = 50; // Even more cells removed for hard level
            break;
        default:
            attempts = 20; // Default to easy if difficulty is undefined or unexpected
    }

    while (attempts > 0) {
        let row = Math.floor(Math.random() * GRID_SIZE);
        let col = Math.floor(Math.random() * GRID_SIZE);
        if (grid[row][col] !== UNASSIGNED) {
            grid[row][col] = UNASSIGNED;
            attempts--;
        }
    }
};


const sudokuCreateAndStoreSolution = (grid) => {
  sudokuCreate(grid);
  solutionGrid = grid.map(row => [...row]);
}

export function isCorrectPlacement(grid, row, col, number) {
  return solutionGrid[row][col] === number;
}

export function generateSudokuPuzzle(difficultyLevel) {
  let sudokuGrid = initializeEmptyGrid(GRID_SIZE);
  sudokuCreateAndStoreSolution(sudokuGrid);
  let puzzleGrid = sudokuGrid.map(row => [...row]); // Clone the grid
  removeCells(puzzleGrid, difficultyLevel);
  return puzzleGrid;
}

export function canPlaceNumber(grid, row, col, number){
  return isRowSafe(grid, row, number) &&
         isColSafe(grid, col, number) &&
         isBoxSafe(grid, Math.floor(row / 3) * 3, Math.floor(col / 3) * 3, number);
};