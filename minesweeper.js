document.addEventListener('DOMContentLoaded', startGame)


// Add an eventlistener to reset the game
//createResetListener()

// Define your `board` object here!
var board = {
}
// Define the cells property as an array
board.cells = []


// Create a constructor function to define the cell array objects for the board grid
function Cell(row, col, isMine, isMarked, hidden) {
  this.row = row;
  this.col = col;
  this.isMine = isMine;
  this.isMarked = isMarked;
  this.hidden = hidden
}

// Define the board size x size
var size = 3

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

var randomNumberMines = getRandom(1, size * size)

// Assign the number of mines to the class counter

for (let i = 0; i < randomNumberMines; i++) {
  var randomPlace = getRandom(0, size * size)
  board.cells[randomPlace].isMine = true
}

function startGame() {

  for (let i = 0; i < size; i++) {

    var cell = board.cells[i] //Joseph
    cell.surroundingMines=countSurroundingMines(cell) //Joseph


  }
  
  // Initialise the timer
  var timerId;
  clearInterval(timerId);
  setTimer();

  // Initialise the counter
  setCounter();

  lib.initBoard()


}

//Create event listeners for clicks to check for win
document.onclick =checkForWin
window.oncontextmenu = checkForWin



// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin() {

  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  var totalMarked = 0
  for (let i = 0; i < size * size; i++) {
    if (board.cells[i].isMine && board.cells[i].isMarked) { 
      //console.log("1 marked mine")
      totalMarked++ 
    }
  }
  if (totalMarked==randomNumberMines) { 
    
    return lib.displayMessage('You win!')}
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//

//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines(cell) {
  var count=0
  var surrounding = lib.getSurroundingCells(cell.row, cell.col)
  for (let i = 0; i < surrounding.length; i++) {
      var cell=surrounding[i]
      if (cell.isMine) {
        count++
      }
  }
  return count
}

// Add a function to set the timer on the timer id
function setTimer () {
  var elapsedTime = 0
  timerId = setInterval(function(){
    elapsedTime += 1;
    document.getElementById('timer').innerText = elapsedTime.toString().padStart(2, '0');
  }, 1000);
}

// Add a function to set the mine counter to the mine randomNumberMines
function setCounter () {
    document.getElementById('mineCounter').innerText=randomNumberMines;
}




// Add a function to reset 
function createResetListener() { 
  document.getElementsByClassName('reset').addEventListener('click', function() {
    lib.initBoard()
  });
}