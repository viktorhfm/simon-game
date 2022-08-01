var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var currentLevel = 0;

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  // Cambia el titulo
  level++;
  $("#level-title").text("Level " + level);
  // flashea el color
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  // Reproduce sonido
  var name = "sounds/" + randomChosenColor + ".mp3";
  playSound(name);
  userClickedPattern = [];
  currentLevel = 0;
}

function playSound(name) {
  var audio = new Audio(name);
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] !== gamePattern[currentLevel]) {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
    // console.log("wrong");
  } else {
    // console.log("success");
    if (currentLevel+1 === level) {
      setTimeout(nextSequence, 1000);
    }
  }
}

function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
}

$(document).on("keypress", function() {
  if (started === false) {
    started = true;
    nextSequence();
  }
});

$(".btn").on("click", function(event) {
  var userChosenColor = event.target.id;
  var name = "sounds/" + userChosenColor + ".mp3";
  playSound(name);
  animatePress(userChosenColor);
  userClickedPattern.push(userChosenColor);
  checkAnswer(currentLevel);
  currentLevel++;
});
// console.log(userClickedPattern);
