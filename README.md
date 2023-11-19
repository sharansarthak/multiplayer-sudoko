
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
Engage in a competitive Sudoku match where the goal is to complete as much of the board as possible within the allotted time. Outscore your opponent by making correct entries and strategizing your moves.

### Rules of the Game
- Two players compete on a shared Sudoku board.
- Each player has an individual timer.
- Players alternate turns to fill in the Sudoku grid.
- Points are awarded for correct entries, with the amount depending on the grid's difficulty.
- Incorrect entries result in point deductions.
- The game ends when either the board is completed or a player's timer runs out.

## How to Play

### Steps to Play Sudoku Showdown
1. **Start the Game**: Open `index.html` in a live server environment to launch the game.
2. **Enter Player Details**: Players enter their names and select the difficulty level, which determines the number of pre-filled cells on the board.
3. **Begin the Match**: Click the 'Start Game' button to begin playing with the selected settings.
4. **Gameplay**: Players alternate turns, filling in the Sudoku grid. Each turn is timed.
5. **Scoring Points**: Points are scored for correct entries, with penalties for incorrect guesses.
6. **Keep an Eye on the Timer**: If a player's timer runs out, their turn ends automatically.
7. **Objective**: Complete the Sudoku board with the highest score. The game ends when the board is filled or a player's timer runs out.
8. **Declaring a Winner**: The game concludes when the board is full or a timer expires. The player with the highest score wins.

## Point System

### Earning and Losing Points
- **Correct Entry**: +100 points for each correct entry.
- **Incorrect Entry**: -50 points as a penalty for an incorrect entry.
- **Valid Entry Not in Final Solution**: +80 points for an entry that's correct based on the current board state but not part of the final solution.
- **Strategic Play**: Points system encourages strategic thinking – players must balance speed with accuracy.

### Difficulty Levels
- **Difficulty Selection**: The difficulty level (Easy, Medium, Hard) affects the number of pre-filled cells on the board. Easier levels have more pre-filled cells, while harder levels have fewer, requiring more input from players.

## Game Logic

### Game Termination
- The game concludes once the entire board is filled.
- Alternatively, the game can end if a player's timer expires.

### Penalties
- Invalid moves lead to a loss of turn and point deduction.
- Exceeding a 4-minute limit for a turn will trigger an automatic switch to the next player.

## UI Design

### Layout and Structure
- Central Sudoku Board
- Dedicated areas for Player 1 and Player 2, displaying timers and scores.

### Visual Elements
- Distinct player name
- Clearly defined Sudoku grid
- Dynamic countdown timers
- Interactive scoreboards
- Correct placement animations
- Confetti on win 


## Functionality Design

### Custom Animations
- Smooth animated transitions for turn switching.
- Immediate visual feedback for correct and incorrect Sudoku entries.

### Custom Interaction Mechanism
- Robust mechanism to validate Sudoku entries.
- Efficient handling of timer operations correlating with player turns.

### Custom Algorithms
- Sophisticated algorithm for point calculation, factoring in the complexity of Sudoku entries.
- Advanced timer algorithm for accurate countdown and turn management.

## Running the Game

### Important Note
To ensure full functionality, `index.html` must be run as a live server. This is essential for handling certain JavaScript operations and maintaining the game's dynamic behavior.

## Acknowledgments

I extend my gratitude to ChatGPT for its assistance in parts of the code development. While ChatGPT provided foundational insights, the final implementation and refinements were executed by me, incorporating critical thinking and customized solutions to align with the game's unique requirements.
