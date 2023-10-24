# Sudoku Showdown

## Course Information
- **Course**: SENG 513
- **Semester**: Fall 2023
- **UCID**: 30092835


## Game Overview

### Title
Sudoku Showdown

### Target Platform
Desktop

### Game Genre
Puzzle, Strategy

### Game's Objective
To complete as much of the Sudoku board as possible within the allotted time (hopefully the full board), gaining more points than the opponent.

### Rules of the Game
- Two players share one Sudoku board.
- Each player has their own timer.
- Players take turns to fill in numbers.
- Correct entries award points based on difficulty.
- Incorrect entries result in point deduction.
- The timer for the current player runs only during their turn.
  
## Game Logic

### Point Calculation
- Correct Entry: Points awarded based on the difficulty level of the Sudoku grid square filled.
- Incorrect Entry: A penalty of X points will be deducted.

### Game Termination
- The game ends when the entire board is filled.
- The game can also end if a player's timer runs out.

### Penalties
- Invalid moves will result in a loss of turn and point deduction.
- Taking more than 2 minutes for a single turn will automatically skip to the next player.

## UI Design

### Layout and Structure
- Sudoku Board in the center
- Player 1 and Player 2 areas on either side, showing timer and scores.

### Visual Elements
- Player avatars
- Sudoku grid
- Countdown timers
- Scoreboards

## Functionality Design

### Custom Animations
- Animated transitions for switching turns
- Visual feedback for correct/incorrect entries

### Custom Interaction Mechanism
- A mechanism to check for correct Sudoku entries
- Handling timer start and stop based on turns

### Custom Algorithms
- Algorithm for calculating points based on the difficulty of the Sudoku entry
- Timer algorithm for countdown and turn management
