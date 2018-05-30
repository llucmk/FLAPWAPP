


// Variables

var semaforo = false;


var lift = 0;
var angle = 0;
var position = 180;
var airSpace = $("#playspace").height();

var jump = 4;
var gravity = -0.25;

// Pipes
var pipeheight = 90; // Separation between pipes
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

    var playerHitBox = document.getElementById("bird").getBoundingClientRect();

    var playerBoxtop = (playerHitBox.top + playerHitBox.width) / 2; // Gets the middle-top position of the bird.
    var playerBoxbottom = (playerHitBox.bottom + playerHitBox.width) / 2; // Gets the middle-top position of the bird.
    var playerBoxleft = playerHitBox.left;
    var playerBoxright = playerHitBox.right;

    // debug
    var boundingbox = $("#playerbox");
    boundingbox.css('left', playerBoxleft);
    boundingbox.css('top', playerBoxtop);
    boundingbox.css('height', playerHitBox.height);
    boundingbox.css('width', playerHitBox.width);

    // console.log(playerBoxright);

    if (pipes[0] != null) {
        var lastPipeSel = pipes[0];
        var nextUpperPipe = lastPipeSel.children(".pipe_upper");
        // nextUpperPipe.css({"background-color":"red"});

        var pipetop = nextUpperPipe.offset().top + nextUpperPipe.height(); // Gets the top position of the upper pipe and adds the height of the pipe to get the left bottom corner coords
        var pipebottom = pipetop + pipeheight;
        var pipeleft = nextUpperPipe.offset().left - 2;
        var piperight = pipeleft + nextUpperPipe.width();

        // debug

        var boundingbox = $("#pipebox");
        boundingbox.css('left', pipeleft);
        boundingbox.css('top', pipetop);
        boundingbox.css('height', pipeheight);
        boundingbox.css('width', nextUpperPipe.width());



        // is the player inside the pipe on x position?
        if(playerBoxright > pipeleft) {
            // Is it passing between the top and bottom pipes?
            if(nextUpperPipe.height() > pipetop) {
                console.log(nextUpperPipe.height());
                console.log("Bien!");
                console.log(playerBoxtop);
            } else {
                // The player touched the pipes
                console.log(nextUpperPipe.height());
                console.log("bad!");
                console.log(playerBoxtop);
                playerDead();
            }
        }

        // console.log(playerBoxleft + "  > " + piperight);
        if(playerBoxleft > piperight) {
            pipes.splice(0, 1);
        }


        // console.log(nextUpperPipe.width());
        // console.log(playerHitBox.x + "   " +nextpipe.offset().left);



        // var upperPipeHbox = lastPipeSel.children(".pipe_upper");
        // var upperboundingPipeHbox = lastPipeSel.children(".pipe_upper").getBoundingClientRect();
        // var lowerPipeHbox = lastPipeSel.children(".pipe_lower").getBoundingClientRect();
        //
        // var pipetop = upperPipeHbox.offset().top + upperPipeHbox.height();
        //
        // // Debugging
        // console.log("pipeptop: " + pipetop  + " <br /> upperboundingPipeHbox: " + upperboundingPipeHbox.top );
        // console.log(playerHitBox.right);

        }

        // $(bird).css("background-color", "blue");

        // lastPipeSel[0].style.backgroundColor = "red";
        // lastPipeSel[0].children[1].style.backgroundColor = "red";
        // console.log(lastPipeSel[0].children[1]);
        // lastPipeSel.style.backgroundColor = "red";

    // console.log(pipes);
    // var upPipeHitBox = document.getElementById("pipe_upper").getBoundingClientRect();
    // var lowPipeHitBox = document.getElementById("pipe_lower").getBoundingClientRect();
    //  console.log(pipes);


}

function updateBird(bird){

    //rotation
    angle = Math.min((lift / 10) * 90, 90);

    // if bird touches the ground, "stops". Here it should stop the game and let introduce the points on a nickname.
    if (position >= 405){
        $(bird).css({ transform: 'rotate(' + -angle + 'deg)' ,top: position });
        position = 405;
    } else {
        $(bird).css({ transform: 'rotate(' + -angle + 'deg)' ,top: position });
    }

}

function updatePipes() {
    // Remove any pipe that already passed left position by more than -70.
    $(".pipe").filter(function() { return $(this).position().left <= -70; }).remove();

    //adds a new pipe
    var padding = 60;
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