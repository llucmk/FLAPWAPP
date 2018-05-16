


// Variables

var semaforo = false;


var lift = 0;
var angle = 0;
var position = 320;

var jump = 4;
var gravity = -0.25;

// Pipes
var pipes =  new array();
/* Variables for Game Framerate and loop updating */
var gameEngine;

// Events handlers

//Activates action on touch or mousedown.
if("ontouchstart" in window)
    $(document).on("touchstart", screenClick);
else
    $(document).on("mousedown", screenClick);



function showSplash(){

}

function startGame(){

    semaforo = true;
    var fps = 1000 / 45;  // This is 1 second divided in 45 frames
    gameEngine = setInterval(gameLoop, fps); // The function will be executed 45 times per second.

}

function gameLoop(){
    var bird = $("#bird");


    lift += gravity;
    position -= lift;

    updateBird(bird);
}

function updateBird(bird){

    //rotation
    angle = Math.min((lift / 10) * 90, 90);
    $(bird).css({ transform: 'rotate(' + -angle + 'deg)' ,top: position });
}

function jumpBird(){
    lift = jump;

    if(!semaforo){
        startGame();
    }
}

function screenClick() {
    jumpBird();
}

function playerDead(){

}

function saveScore(){

}

function showScore(){

}