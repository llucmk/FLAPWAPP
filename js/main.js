// Variables

var semaforo = false;


var lift = 0; // This will be the variable that controls the lift of the player.
var angle = 0;  // Angle of player depending if flies or falls.
var position = 180; // Start position of game.
var airSpace = $("#playspace").height();  // Holds the height value of the entire playspace.

var jump = 4; // Power of a jump.
var gravity = -0.25; // Gravity

var scorePoints = 0;  // points scored

// Pipes
var pipeheight = 90; // Separation between pipes
var pipes = new Array(); // Contains all the pipes spawned.

/* Variables for Game Framerate and loop updating */
var gameEngine;
var gamePipes;

// Events handlers

//Activates action on touch or mousedown.
if ("ontouchstart" in window) {
    $(document).on("touchstart", screenClick);
}else {
    $(document).on("mousedown", screenClick);
}


function startGame() {

    semaforo = true;
    var fps = 1000 / 45;  // This is 1 second divided in 45 frames
    gameEngine = setInterval(gameLoop, fps); // The function will be executed 45 times per second.
    gamePipes = setInterval(updatePipes, 2000); // Time between new pipes added.

}

function gameLoop() {
    var bird = $("#bird");

    // lift is affected by gravity
    lift += gravity;
    // then position is affected by lift
    position -= lift;

    // updates the angle of bird
    updateBird(bird);

    // Delimitations
    var playSpaceDelimitation = document.getElementById("playspace").getBoundingClientRect();
    var playerHitBox = document.getElementById("bird").getBoundingClientRect();

    // Player delimitations
    var playerBoxtop = playerHitBox.top - playSpaceDelimitation.top + 7;
    var playerBoxbottom = playerBoxtop + playerHitBox.height - 13;
    var playerBoxleft = playerHitBox.left + 5;
    var playerBoxright = playerHitBox.right - 10;

    // If player tries to escape from skylimit, limit position to 0.
    if (playerHitBox.top <= playSpaceDelimitation.top){
        position = 0;
    }

    // If player touches the ground, dies.
    if (playerBoxbottom >= (playSpaceDelimitation.height)) {
        playerDead();
    }

    if ($("#scorecounter").children().html() != scorePoints) {
        $("#scorecounter").children().html(scorePoints);
    }

    // If any pipe spawns, execute this code.
    if (pipes[0] != null) {
        var lastPipeSel = pipes[0];
        var nextUpperPipe = lastPipeSel.children(".pipe_upper");


        // Pipes deilimitations
        var pipetop = (nextUpperPipe.offset().top + nextUpperPipe.height()) - playSpaceDelimitation.top;
        var pipebottom = pipetop + pipeheight;
        var pipeleft = nextUpperPipe.offset().left - 2;
        var piperight = pipeleft + nextUpperPipe.width();


        // debug
        var boundingbox = $("#playerbox");
        boundingbox.css('left', playerBoxleft);
        boundingbox.css('top', playerBoxtop);
        boundingbox.css('height', playerHitBox.height);
        boundingbox.css('width', playerHitBox.width);


        var boundingbox = $("#pipebox");
        boundingbox.css('left', pipeleft);
        boundingbox.css('top', pipetop);
        boundingbox.css('height', pipeheight);
        boundingbox.css('width', nextUpperPipe.width());


        // is the player inside the pipe on x position?
        if (playerBoxright > pipeleft) {
            // Is it passing between the top and bottom pipes?
            if (playerBoxtop > pipetop && playerBoxbottom < pipebottom) {
            //    Good
            } else {
                playerDead();
            }
        }

        if (playerBoxleft > piperight) {
            pipes.splice(0, 1);
            scorePoints += 1;
        }

    }

}

function updateBird(bird) {

    //rotation
    angle = Math.min((lift / 10) * 90, 90);

    // if bird touches the ground, "stops". Here it should stop the game and let introduce the points on a nickname.
    if (position >= 405) {
        $(bird).css({transform: 'rotate(' + -angle + 'deg)', top: position});
        position = 405;
    } else {
        $(bird).css({transform: 'rotate(' + -angle + 'deg)', top: position});
    }

}

function updatePipes() {
    // Remove any pipe that already passed left position by more than -70.
    $(".pipe").filter(function () {
        return $(this).position().left <= -70;
    }).remove();

    //adds a new pipe
    var padding = 60;
    var constraint = airSpace - pipeheight - (padding * 2); // adds a padding to restrict spawn position.

    var topheight = Math.floor((Math.random() * constraint) + padding); //adds lower padding near ground

    var bottomheight = (airSpace - pipeheight) - topheight;

    var newpipe = $('<div class="pipe animate"><div class="pipe_upper" style="height: ' + topheight + 'px;"></div><div class="pipe_lower" style="height: ' + bottomheight + 'px;"></div></div>');
    $("#playspace").append(newpipe);
    pipes.push(newpipe);
}

function jumpBird() {
    lift = jump;

    if (!semaforo) {
        startGame();
    }
}

function screenClick() {
    jumpBird();
}

function playerDead() {

    // Stop animating everything.
    $(".animate").css('animation-play-state', 'paused');

    // Clear the intervals and freezes the game.
    clearInterval(gameEngine);
    clearInterval(gamePipes);
    gameEngine = null;
    gamePipes = null;

    saveScore();

}


function saveScore() {


    var name = prompt("Please, enter your name:");
    var playerName_Score = { "Players":[{"Name":name, "Score":scorePoints}]};

// Check browser support
    if (typeof(Storage) !== "undefined") {

        if(localStorage.getItem("PlayerNS") == null) {
            // Store
            localStorage.setItem("PlayerNS", JSON.stringify(playerName_Score));
        } else {
            var retrievedObject = localStorage.getItem("PlayerNS");
            var parsedOject = JSON.parse(retrievedObject);
            localStorage.clear();
            parsedOject["Players"].push({"Name":name, "Score":scorePoints});
            localStorage.setItem("PlayerNS", JSON.stringify(parsedOject));
        }

    } else {
        console.log("Sorry, your browser does not support Web Storage...");
    }

    showScore();

}

function showScore() {
    var PlayerHighScore = localStorage.getItem("PlayerNS");
    var parsedObject = JSON.parse(PlayerHighScore);
    var arrayzed = Object.values(parsedObject);

    var byScore = arrayzed[0].slice(0);
    byScore.sort(function (a, b) {
        return b.Score - a.Score;
    });

    for (var i = 0; i < 10; i++) {
        if (arrayzed[0].length > i) {
            $("#scores").append("<p>" + (i + 1) + ". " + byScore[i].Name + " - " + byScore[i].Score + "</p>");
        }
    }


    $("#gamescore").css("display", "block");
    $("#gamescore").css("z-index", "2000");
    $("#gamescore").animate({opacity: "1"}, 1000);

}