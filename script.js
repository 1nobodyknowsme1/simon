
var userClickedPattern = [];

var gamePattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var level = 0;

var started = false;


function nextSquence() {
    userClickedPattern = [];  
    
    // getting random number from 0 to 3

    var random = Math.floor(Math.random() * 4)
    var randomChosenColor = buttonColors[random];
    console.log(randomChosenColor);
    // adding the selected color by random number to gamePattern
    gamePattern.push(randomChosenColor);
    // adding animation to the random chosen color
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    // playing sound for random colors
    playSound(randomChosenColor);
    $("#level-title").text("level "+level++)


};




function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
            nextSquence();
        }, 1000);

      }

    } else {

      var wrongAudio = new Audio("sounds/wrong.mp3");
      wrongAudio.play();
      $("body").addClass("game-over");
      setTimeout(() => {
        $("body").removeClass("game-over")
      }, 200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
    }

}


function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}


$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSquence();
      started = true;
    }
  });

// Playing sound function

function playSound(name) {
    var audio = new Audio(name + ".mp3");
    audio.play();
};

// Getting id of color user pressed

$(".btn").click(function (e) {
    var userChosenColor = e.target.id;
    userClickedPattern.push(userChosenColor);
    // Playing sound on the click of user
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
};



