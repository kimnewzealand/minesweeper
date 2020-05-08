document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {
}
// Define the cells property as an array
board.cells = []

// Create a constructor function to define the cell array objects
function Cell(row, col, isMine, isMarked, hidden, surroundingMines) {
  this.row = row;
  this.col = col;
  this.isMine = isMine;
  this.isMarked = isMarked;
  this.hidden = hidden
}

// Define the board size
var size = 2


//Add the cells to the board cells using a for loop
for (let i = 0; i < size; i++) {
  for (let j = 0; j < size; j++) {
    // Create a new object
    var cell = new Cell(i, j, false, false, true)
    board.cells.push(cell)
  }
}
//Add mines using random numbers between 0 and size*size
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

var randomNumber = getRandom(0, size * size)
for (let i = 0; i < randomNumber; i++) {
  var randomPlace = getRandom(0, size * size)
  board.cells[randomPlace].isMine = true
}

function startGame() {
  // Don't remove this function call: it makes the game work!
  for (let i = 0; i < size; i++) {
    var row = board.cells[i].row
    var col = board.cells[i].col
    var surroundingCells = getSurroundingCells(row, col);
    board.cells[i].countSurroundingMines = surroundingCells
  }

  lib.initBoard()


}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin() {

  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  var totalHidden = 0
  for (let i = 0; i < size * size; i++) {
    if (board.cells[i].hidden) { totalHidden++ }
  }
  if (size*size-totalHidden==randomNumber) { return lib.displayMessage('You win!')}
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines(cell) {
}

