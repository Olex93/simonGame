var simonsMemory = [];
var userSequence = [];
var userChoice;
var userNumber;
var level = 0;
var simonsChoice;
var title = $("h1");
var level = 0;


//keypress to start when on level 0//
$(document).keypress(function() {
  if (level == 0) {
    nextLevel();
  }
});


function nextLevel() {
  level = (level + 1);
  title.text("Level " + level);
  addToSimon();
}


//Start level sequence//
function addToSimon() {
  //generate random number//
  var randomNumber = Math.ceil((Math.random() * 4));
  //add random number to SimonsMemory//
  simonsMemory.push(randomNumber);
  //translate random number to color & highlight//
  randomColor(randomNumber);

}

//Identify keypress, turn to number and push to user sequence//
$(".btn").click(function(e) {
  //work out which color is pressed
  if (e.id == "green" || "red" || "yellow" || "blue") {
    userChoice = this.id;
  }
  //turn the color to a number and add to userSequence//
  if (userChoice == "green") {
    userNumber = 1;
  }
  if (userChoice == "red") {
    userNumber = 2;
  }
  if (userChoice == "yellow") {
    userNumber = 3;
  }
  if (userChoice == "blue") {
    userNumber = 4;
  }
  //highlight the pressed button//
  highlightColor(userChoice);
  playSound(userChoice);
  userSequence.push(userNumber);
  checkAnswer(userNumber);

});



//Check if correct//
function checkAnswer(userNumber) {
  if (userNumber == simonsMemory.slice(userSequence.length - 1, userSequence.length)) {
    console.log("success");

    if (userSequence.length == simonsMemory.length) {
      userSequence = [];
      setTimeout(function() {
        nextLevel();
      }, 1000);
    }
  } else {
    resetGame();
  }
}



function resetGame() {
  simonsMemory = [];
  userSequence = [];
  title.text("Press A Key to Start");
  level = 0;
  playSound("wrong");
  $("body").addClass("game-over");

  setTimeout(function(){
    $("body").removeClass("game-over");
}, 150);
}


//Translate the random number into a color//
function randomColor(randomNumber) {
  if (randomNumber == 1) {
    simonsChoice = "green";
  }
  if (randomNumber == 2) {
    simonsChoice = "red";
  }
  if (randomNumber == 3) {
    simonsChoice = "yellow";
  }
  if (randomNumber == 4) {
    simonsChoice = "blue";
  }
  highlightColor(simonsChoice);
  playSound(simonsChoice);
}

//Highlight the button that has been seleted / pressed //
function highlightColor(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function() {
    $("#" + color).removeClass("pressed");
  }, 150);
}

//play sound//
function playSound(color){
var audio = new Audio("sounds/" + color + ".mp3");
audio.play();
}
