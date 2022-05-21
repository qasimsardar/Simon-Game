var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStarted = false;

$(document).keypress(function(event){
    if (!gameStarted){
        $("#level-title").text("Level " + level);
        nextSequence();
        gameStarted = true;
    }
});

$(".btn").click(function(event){

    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);

    animatePress(event.target.id);
    playSound(event.target.id);

    checkAnswer(userClickedPattern.length - 1);

})


function playSound(name){

    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();

}

function animatePress(currentColor){
    $("#" + currentColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    $("#" + currentColor).addClass("pressed");

    setTimeout(function(){$("#" + currentColor).removeClass("pressed");}, 100);
}

function startOver(){
    var gamePattern = [];
    var level = 0;
    var gameStarted = false;

}

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over");}, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function nextSequence(){
    userClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];

    gamePattern.push(randomChosenColour);
    animatePress(randomChosenColour);
    playSound(randomChosenColour);    
    
}
