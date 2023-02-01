let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;

function nextSequence(){
    randomNumber = Math.floor(Math.random() * 4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    clickColorButton(randomChosenColour);
    console.log("gamePattern: "+gamePattern);
    increaseLevel();
}

$(document).keypress(function(event){
    if(event.key == "p"){ //For debug
        nextSequence();
    }else{
        if (level==0){
            nextSequence();
        }
    }
});

function playSound(color){
    let audio = new Audio('sounds/'+color+'.mp3');
    audio.play();
}

$(".btn").click(function(){
    userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);

    clickColorButton(userChosenColour);
    console.log("userClickedPattern: "+userClickedPattern);
    
    checkAnswer(userClickedPattern.length-1);
});

function clickColorButton(color){
    $("#"+color).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(color);
    animatePress(color);
}


function animatePress(currentColour){
    let button = $("#"+currentColour);
    button.addClass("pressed");
    setTimeout(() => {
        button.removeClass("pressed");
      }, 100);
}

function increaseLevel(){
    level++;
    $("#level-title").text("Level "+level);
}

function checkAnswer(userIndex){
    if (gamePattern[userIndex]==userClickedPattern[userIndex]){
        // console.log("Success");
        if (userIndex==level-1){
            // console.log("Next level");
            setTimeout(() => {
                userClickedPattern = [];
                nextSequence();
              }, 1000);
        }
    }else{
        // console.log("Restart Level");
        startOver();
    }
    
}

function startOver(){
    $("body").addClass("game-over");
    setTimeout(() => {
        $("body").removeClass("game-over");
      }, 200);

    lastLevel = level;
    level = 0;
    gamePattern=[];
    userClickedPattern=[];
    playSound("wrong");
    $("#level-title").text("Game Over in level "+lastLevel+", Press Any Key to Restart");

}