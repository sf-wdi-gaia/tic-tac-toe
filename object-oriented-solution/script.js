window.onload = function(){
  new Game().start();
}

function Game() {
  this.boxes = document.getElementsByTagName("td");
  this.turnText = document.querySelector(".playerTurn");
  this.counter = 1;
  this.winCounter = 0;
  this.OMoves = [];
  this.XMoves = [];
  this.winningCombinations= [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
};

Game.prototype.start = function(){
  this.addXandOListener();
  this.addResetListener();
};

 Game.prototype.addXandOListener = function(){
  for (var i = this.boxes.length - 1; i >= 0; i--) {
    this.boxes[i].addEventListener("click", this.addXorO.bind(this));
  };
};

Game.prototype.addXorO = function(event){
  if (event.target.innerHTML.length === 0){
    if (this.counter % 2 === 0) {
      this.OMoves.push(parseInt(event.target.getAttribute("data-num")));
      event.target.innerHTML = "O";
      event.target.setAttribute("class","O");
      this.turnText.innerHTML = "It is X's turn";
      this.counter++;
      this.checkForWin(this.OMoves, "O");
    }
    else {
      this.XMoves.push(parseInt(event.target.getAttribute("data-num")));
      event.target.innerHTML = "X";
      event.target.setAttribute("class","X");
      this.turnText.innerHTML = "It is O's turn";
      this.counter++;
      this.checkForWin(this.XMoves, "X");
    };
  // if the Game.counter is greater than or equal to 10, the game is a draw!
  if (this.counter >= 10){
    this.turnText.innerHTML = "Game Over!";
    var conf = confirm("It's a draw, do you want to play again?");
    if(conf){
      this.resetBoard.bind(this);
    };
  };
};
};

Game.prototype.addResetListener = function(){
  var resetButton = document.getElementById("reset");
  resetButton.addEventListener("click", this.resetBoard.bind(this));
};

 Game.prototype.checkForWin = function(movesArray, name){
  // loop over the first array of winning combinations
  for (i = 0; i < this.winningCombinations.length; i++) {
    // reset the winCounter each time!
    winCounter = 0;
    // loop over each individual array
    for (var j = 0; j < this.winningCombinations[i].length; j++) {
      // if the number in winning combo array is === a number in moves array, add to winCounter
      if(movesArray.indexOf(this.winningCombinations[i][j]) !== -1){
        winCounter++;
      };
      // if winCounter === 3 that means all 3 moves are winning combos and game is over!
      if(winCounter === 3){
        alert("Game over, " + name + " wins!");
        this.resetBoard.bind(this);
      };
    };
  };
};

 Game.prototype.resetBoard = function(){
  for (var i = this.boxes.length - 1; i >= 0; i--) {
    this.boxes[i].innerHTML="";
    this.boxes[i].setAttribute("class","clear");
  };
  this.OMoves = [];
  this.XMoves = [];
  winCounter=0;
  this.counter = 1;
  this.turnText.innerHTML = "It is X's turn";
};
