// alert("Game Start");
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

// GAME START
$(document).on("keydown", function () {
    if (!started)
    {
        $("h1#level-title").text("Level "+ level);
        nextSequence();
        started = true;
    }
});

function nextSequence()
{
    userClickedPattern = [];
    level ++;
    randomNumber = Math.floor(Math.random()*4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    // console.log("gamePattern: "+ gamePattern);
    $("#"+ randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    $("h1#level-title").text("Level "+ level);
    return gamePattern;
}

// button clicked
$(".btn").on("click",function ()
{
    var userChosenColour =  this.id;
    playSound(userChosenColour);
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);
    // console.log("userClickedPattern: "+ userClickedPattern);
    checkAnswer(userClickedPattern.length-1);
})

function playSound(name)
{
    var sound = new Audio("sounds/"+ name+'.mp3');
    sound.play();
}

function animatePress(currentColour)
{
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
    }, 100);
}



function checkAnswer(currentLevel)
{
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
        console.log("SUCESS");
    if (userClickedPattern.length === gamePattern.length)
    {
        setTimeout(nextSequence(), 1000);
    }
    }
    else
    {
        playSound("wrong")
        $("body").addClass("game-over");
        setTimeout(function () {  $("body").removeClass("game-over");  }, 200);
        $("h1#level-title").text("Game Over, Press Any Key to Restart");
        startOver()
    }
}

// Restarting the game
function startOver()
{
    level = 0;
    gamePattern = [];
    started = false;
}