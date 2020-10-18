var buttonColours = ["red", "blue", "green", "yellow"];
// var randomChosenColour = buttonColours[nextSequence()];
var randomChosenColour;
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$(document).keypress(function() {
  level = 0;
  nextSequence();
});

$(".btn").click(function(event) {
  // console.log(event.target.id);
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(event.target.id);

  checkAnswer(userClickedPattern.length);
});

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  // console.log(randomNumber);
  // return randomNumber;
  randomChosenColour = buttonColours[randomNumber];
  $("#" + randomChosenColour).fadeOut(250).fadeIn(250);
  gamePattern.push(randomChosenColour);
  // console.log(randomChosenColour);
  level++;
  $("#level-title").text("Level " + level);
  userClickedPattern = [];
  playSound(randomChosenColour);
}

function playSound(button) {
  switch (button) {
    case "blue":
      var audio = new Audio('sounds/blue.mp3');
      audio.play();
      break;
    case "green":
      var audio = new Audio('sounds/green.mp3');
      audio.play();
      break;
    case "red":
      var audio = new Audio('sounds/red.mp3');
      audio.play();
      break;
    case "yellow":
      var audio = new Audio('sounds/yellow.mp3');
      audio.play();
      break;
    default:
      console.log(button);
  }
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  console.log(gamePattern);
  console.log(userClickedPattern);
  if (gamePattern[currentLevel - 1] === userClickedPattern[currentLevel - 1])
    console.log("success");
  else {
    console.log("wrong");
    var audio = new Audio('sounds/wrong.mp3');
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }

  if (currentLevel === gamePattern.length)
    setTimeout(nextSequence, 1000);
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}
