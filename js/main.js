


// Variables

var semaforo = false;


var lift = 0;
var angle = 0;
var position = 180;
var airSpace = $("#playspace").height();

var jump = 4;
var gravity = -0.25;

// Pipes
var pipeheight = 90;
var pipewidth = 52;
var pipes =  new Array();

/* Variables for Game Framerate and loop updating */
var gameEngine;
var gamePipes;

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
    gamePipes = setInterval(updatePipes, 2000); // Time between new pipes added.

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
    console.log(position + " height & landLimit " + 405 );

    // if bird touches the ground, "stops". Here it should stop the game and let introduce the points on a nickname.
    if (position >= 405){
        $(bird).css({ transform: 'rotate(' + -angle + 'deg)' ,top: position });
        position = 405;
    } else {
        // console.log("no problem");
        $(bird).css({ transform: 'rotate(' + -angle + 'deg)' ,top: position });
    }

}

function updatePipes() {
    // Remove any pipe that already passed left position by more than -100.
    $(".pipe").filter(function() { return $(this).position().left <= -100; }).remove();

    //adds a new pipe
    var padding = 80;
    var constraint = airSpace - pipeheight - (padding * 2) ; // adds a padding to restrict spawn position.

    var topheight = Math.floor((Math.random()*constraint) + padding); //adds lower padding near ground

    var bottomheight = (airSpace - pipeheight) - topheight;

    var newpipe = $('<div class="pipe animated"><div class="pipe_upper" style="height: ' + topheight + 'px;"></div><div class="pipe_lower" style="height: ' + bottomheight + 'px;"></div></div>');
    $("#playspace").append(newpipe);
    pipes.push(newpipe);
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