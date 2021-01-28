//Storing essential values for the game
let currentColor = "";
let gameRunning = false;
let inAiMode = false;
let teamToMove = "";
let pointsToWin;
//We need these variable later on when it comes to check for wins
let gameSize;
let gameField = [];
//store our points per Team
let pointsTeamOne = 0;
let pointsTeamTwo = 0;
//store our player names
let playerNameOne;
let playerNameTwo;
//add the symbols for the player
let playerOne = "b";
let playerTwo = "o";
//adding our soundeffects here
let bumm = new Audio("./resources/audioFiles/bumm.wav");
let chack = new Audio("./resources/audioFiles/chack.flac");
let beep1 = new Audio("./resources/audioFiles/beep1.wav");
let beep2 = new Audio("./resources/audioFiles/beep2.wav");
let victory = new Audio("./resources/audioFiles/victory.mp3");

//We want to adjust our x or y value for our gamefield so that its only possible to create squares +
//adjust the player names to the left and right.
//function is called by HTML Input box 
function onGameSizeValueChange() {
    $("#gameSizeY").val($("#gameSizeX").val());
    beep1.play();
}
$("#playerOne").on("input", function() {
    $("#scoreL").html(`<br>${$("#playerOne").val()}`);
    playerNameOne = `<br>${$("#playerOne").val()}`;
});
$("#playerTwo").on("input", function() {
    $("#scoreR").html(`<br>${$("#playerTwo").val()}`);
    playerNameTwo = `<br>${$("#playerTwo").val()}`;
});

//switch our Settings menu from Player vs Player to Player vs AI 
//function is called by HTML button
function changeGameMode() {
    //checking if the left switch is disabled to get the current Situation
    if ($("#lSwitch").is(":disabled")) {
        //switch to AI mode and append our AI UI
        $("#startGameButton").remove();
        $("#lSwitch").removeAttr("disabled");
        $("#rSwitch").prop("disabled", "true");

        $("#playerTwo").val("AI");
        $("#playerTwo").prop("disabled", "true");
        $(".settingsContainerL").addClass("settingsContainerR");
        $(".settingsContainerL").removeClass("settingsContainerL");

        $(".settingsTextHeader").append(
            '<li class="settingsText" id="startAiButton">' +
            '<button class="AiModeButton" onclick="aiMode(1, false)">Easy</button>' +
            '<button class="AiModeButton" onclick="aiMode(2, false)">Medium</button>' +
            '<button class="AiModeButton" onclick="aiMode(3, false)">HARD</button></li>'
        );
    } else {
        //switch to player vs player mode and append the "normal" UI
        $("#startAiButton").remove();
        $("#rSwitch").removeAttr("disabled");
        $("#lSwitch").prop("disabled", "true");

        $("#playerTwo").val("");
        $("#playerTwo").removeAttr("disabled");
        $(".settingsContainerR").addClass("settingsContainerL");
        $(".settingsContainerR").removeClass("settingsContainerR");

        $(".settingsTextHeader").append(
            '<li class="settingsText" id="startGameButton">' +
            '<button class="startGameButton" onclick="settingsMenu()">Start the Game</button></li>'
        );
    }
}

//This function is responsible for validating UI settings submits.
//function gets called by HTML button
function settingsMenu() {
    //Get all values out of our Input fields for later use
    let gX = $("#gameSizeX").val(); //gameSizeX
    let ptw = $("#pointsToWin").val(); //points To Win
    playerNameOne = `<br>${$("#playerOne").val()}`;
    $("#scoreL").html(playerNameOne);

    playerNameTwo = `<br>${$("#playerTwo").val()}`;
    $("#scoreR").html(playerNameTwo);

    //setting our game Conditions = max field Size : 10x10,
    // points to win have to be less than our gameSize
    if (Number(ptw) > Number(gX)) {
        alert("Points to win have to be less than the game Size!");
    } else {
        //currently we only support game fields up to a size of 10x10
        if (gX > 10) alert("The game field size can't be larger than 10!");
        else {
            if ($("#playerOne").val() !== "" && $("#playerTwo").val() !== "") {
                //initiate our GameField with all parameters.
                initUI(gX, ptw);
                beep2.play();
            }
            //if our input field is empty, we tell the user that player names are mandatory
            else alert("You must choose a name for your players!");
        }
    }
}

//Initialize UI with given parameters! gameSize = size of GameField pointsToWin = number of Points needed to win the game
function initUI(gameSizeXY, p) {
    //remove SettingsMenu
    $("#lSwitch").remove();
    $("#rSwitch").remove();

    $(".settingsContainerL").remove();
    $(".settingsContainerR").remove();

    gameSize = gameSizeXY; //assign to store it in our script

    //storing the current ID of the cell we wish to create
    let curID = 0;
    //get total number of cells
    let gridNumber = gameSize * gameSize;
    //calculate our Gridsize, which will be used later on to determine the absolute width/height of each cell/field
    let gridSize = (gameSize / gridNumber) * 100;
    for (let i = 0; i < gameSize; i++) {
        //fill our GameField array with the right amount of cells
        //pushing "container"-Arrays
        gameField.push([]);
        for (let j = 0; j < gameSize; j++) {
            //pushing single cells
            gameField[i].push("");
            curID = i + "" + j;
            //Our grid is capsuled by our OuterGrid, and THEN our Outer Square, the single Grid Panel has an inner-grid and an inner-square
            $("div.outer-square").append(
                `<div id='${curID}'class='inner-grid' style='width: ${gridSize}%; height: ${gridSize}%'>` +
                `<div class='inner-square'></div></div>`
            );
        }
    }
    //add our Reset Game Button
    $("div.outer-grid").append(
        '<button class="resetButton" onclick="resetGame()">RESET GAME</button>'
    );
    //set the value of how many equal symbols in a line are needed to win a game
    pointsToWin = p;
    //go on to Event Listener for mouse events
    addEventListeners();
    if (!inAiMode) {
        //if we're not in AI mode let this function determine who goes first.
        determineStart();
    }
}

//Add event listeners to grids! For clicks and mouseOver effects/events
function addEventListeners() {
    //get all of our cells
    let grids = document.getElementsByClassName("inner-grid");
    for (let i = 0; i < grids.length; i++) {
        //Warning: Functions declared within loops referencing an outer scoped variable may lead to confusing semantics.
        //An dieser Stelle nicht anders lösbar
        /* jshint ignore:start */
        grids[i].addEventListener("click", function() {
            if (gameRunning) handleGridClick(grids[i]);
        });

        grids[i].addEventListener("mouseover", function() {
            if (gameRunning) grids[i].style.setProperty("--grid-color", currentColor);
        });

        grids[i].addEventListener("mouseout", function() {
            if (gameRunning) grids[i].style.setProperty("--grid-color", "#ccc");
        });
        /* jshint ignore:end */
    }
}

//pseudo-randomly determine which team should go first
function determineStart() {
    let random = Math.random();
    if (teamToMove === "") {
        //we tell our Script that the game is now running
        gameRunning = true;
        if (random > 0.5) {
            //in this case playerOne begins
            //setting our UI accordingly
            $("#header").html(playerNameOne + " begins!");
            $("#header").css("color", "#3F88C5");
            currentColor = "#3F88C5";
            teamToMove = playerOne;
        } else {
            //in this case playerTwo begins
            $("#header").html(playerNameTwo + " begins!");
            $("#header").css("color", "#e76f51");
            currentColor = "#e76f51";
            teamToMove = playerTwo;
        }
    }
}

//this function is called everytime the user clicks on a field
//this function is called by our html
function handleGridClick(selGrid) {
    //we determine the position of the current Grid by identifying it's id
    let pos = selGrid.id;
    //if the grid is still empty we can fill in our Team in the array
    if (selGrid.childNodes[0].innerHTML === "") {
        gameField[pos[0]][pos[1]] = teamToMove;
        //change team thats on the move, add content to our Field and change Colors
        if (teamToMove === playerTwo) {
            bumm.play();
            //visually display the team in the right cell
            //change our UI accordingly
            selGrid.childNodes[0].innerHTML = "O";
            currentColor = "#3F88C5";
            teamToMove = playerOne;
            $("#header").html(playerNameOne + ", it's your turn!");
            $("#header").css("color", currentColor);
        } else if (teamToMove === playerOne) {
            chack.play();
            selGrid.childNodes[0].innerHTML = "X";
            teamToMove = playerTwo;
            currentColor = "#e76f51";
            $("#header").html(playerNameTwo + ", it's your turn!");
            $("#header").css("color", currentColor);
            if (inAiMode) {
                /*if we're in UI mode we check for a winSituation and then (if the game is still running)
                let the AI do its next Move*/
                winAI();
                if (gameRunning) bestMove();
            }
        }
    } else {
        //if the user clicks on an already taken cell
        $("#header").html("Please select an empty field!");
    }
    //check if we have a win Situation
    if (!inAiMode) {
        let isThereAWinner = checkForWin();
        if (isThereAWinner === "b") {
            win(playerOne);
        } else if (isThereAWinner === "o") {
            win(playerTwo);
        } else if (isThereAWinner === "tie") {
            $("#header").html("There is no winner! We have a draw.");
            $("div.outer-grid").append(
                '<button class="resetButton" style="bottom: 7%;" onclick="playAgain()">Play again!</button>'
            );
            console.log("there's a tie now.");
        }
    }
}

//Look for possible Winning situations, needs a lot of variables to store 

function checkForWin() {
    //we store each line of the grid in these variables
    let curLineV = "";
    let curLineH = "";

    let winner = null;

    //set our Win condition by repeating the teams letters according to our Points to win variable
    let winCondition1 = playerOne.repeat(pointsToWin);
    let winCondition2 = playerTwo.repeat(pointsToWin);
    //checking vertical and horizontal wins
    for (let i = 0; i < gameSize; i++) {
        curLineV = "";
        curLineH = "";
        //loop through each and every Field
        for (let j = 0; j < gameField[i].length; j++) {
            //add the content of the field to our line string 
            curLineH += gameField[i][j];
            curLineV += gameField[j][i];
        }
        //check our generated strings against our win conditions
        if (curLineV.includes(winCondition1)) {
            return playerOne;
        } else if (curLineV.includes(winCondition2)) {
            return playerTwo;
        }

        if (curLineH.includes(winCondition1)) {
            return playerOne;
        } else if (curLineH.includes(winCondition2)) {
            return playerTwo;
        }
    }
    //check diagonals

    //diagonal line from the left top to the right bottom
    let curLineD = "";
    //diagonal line from the top right to the bottom left
    let curLineD2 = "";

    for (let i = 0; i < gameSize; i++) {
        for (let j = 0; j < gameSize; j++) {
            //in here we check every single Gamefield from up left to down right
            curLineD = "";
            curLineD2 = "";
            //check that we dont try to acess values of our array, that do not exist (values which are out of our current array boundary)
            if (i + (pointsToWin - 1) < gameSize) {
                if (j + (pointsToWin - 1) < gameSize) {
                    for (let m = 0; m < pointsToWin; m++) {
                        //adding the current Field to our line String
                        curLineD += gameField[i + m][j + m];
                    }
                    //check our generated strings against our win conditions
                    if (curLineD.includes(winCondition1)) {
                        return playerOne;
                    } else if (curLineD.includes(winCondition2)) {
                        return playerTwo;
                    }
                }
            }
            if (j - (pointsToWin - 1) >= 0) {
                if (i + (pointsToWin - 1) < gameSize) {
                    for (let m = 0; m < pointsToWin; m++) {
                        //adding the current Field to our line String
                        curLineD2 += gameField[i + m][j - m];
                    }
                    //check our generated strings against our win conditions
                    if (curLineD2.includes(winCondition1)) {
                        return playerOne;
                    } else if (curLineD2.includes(winCondition2)) {
                        return playerTwo;
                    }
                }
            }
        }
    }
    let isThereAnEmptyFieldLeft = false;
    /*check if our whole field is full, in which case we have a draw
    We do that by gettign every single cell and checking if its empty*/
    for (let i = 0; i < gameSize; i++) {
        for (let j = 0; j < gameSize; j++) {
            if (gameField[i][j] === "") {
                isThereAnEmptyFieldLeft = true;
            }
        }
    }
    //this is executed if we have a draw, we add our play Again button.
    if (!isThereAnEmptyFieldLeft) {
        return "tie";
    } else {
        return winner;
    }
}

//if we have a win, all the effects etc. are added here
function win(team) {
    gameRunning = false;
    //we pause the game to prevent additional clicks on our grid and play the victory song
    victory.play();
    //Signalize which team has won both in Code and in our UI
    if (team === "b") {
        pointsTeamOne += 1;
        $("#scoreL").html(pointsTeamOne + playerNameOne);
        $("#header").html(playerNameOne + " has Won!");
        $("#header").css("color", "#3F88C5"); //set to blue
    } else {
        pointsTeamTwo += 1;
        $("#scoreR").html(pointsTeamTwo + playerNameTwo);
        $("#header").html(playerNameTwo + " has Won!");
        $("#header").css("color", "#e76f51"); //set to orange
    }
    //Input our beautiful Confetti effect!, insertAdjacentHTML doesnt changes our Mouseevents.
    $(".outer-grid").before(
        '<div class="pyro" id="py"> <div class="before"></div> <div class="after"></div> </div>'
    );
    $(".outer-square").prepend(
        '<div class="pyro" id="py"> <div class="before"></div> <div class="after"></div> </div>'
    );
    //add play again button
    $("div.outer-grid").append(
        '<button class="resetButton" style="bottom: 7%;" onclick="playAgain()">Play again!</button>'
    );
}

/*If the user wishes to play again, we just reset our current GameField, and keep all Settings & Points.
function is called by HTML button*/
function playAgain() {
    teamToMove = "";
    victory.pause();
    beep2.play();
    //removing html elements including the current gameField
    $(".pyro").remove();
    $(".inner-grid").remove();
    $(".resetButton").remove();
    gameField = [];
    currentColor = "";
    if (!inAiMode) {
        determineStart();
        initUI(gameSize, pointsToWin);
    }
    //if we're playing an AI match reuse our stored Settings.
    if (inAiMode) aiMode(curDifficulty, true);
}

/*If the user wishes to reset the game we call this function we bring up our SettingsUI and reset all current values
function is called by HTML button*/
function resetGame() {
    victory.pause();
    beep2.play();
    currentColor = "";
    teamToMove = "";
    $("#header").html("Who goes first?");
    $("#header").css.color = "#f4a261"; //set to default color
    $(".pyro").remove(); //remove pyro effects
    $(".inner-grid").remove();
    $(".resetButton").remove();
    gameField = [];
    pointsTeamOne = 0;
    pointsTeamTwo = 0;
    $("#scoreL").html("");
    $("#scoreR").html("");
    inAiMode = false;
    openSettings();
}

function openSettings() {
    //add our settingsHTML to the outer-sqaure, so the user can change the current Game-Settings
    $(".outer-square")
        .prepend(`<button class="switch" disabled id="lSwitch" onclick="changeGameMode()">Player vs Player ` +
            `</button><button class="switch" id="rSwitch" onclick="changeGameMode()">Player vs AI</button>
    <div class="settingsContainerL">
    <ul class="settingsTextHeader">
        Click the button below to start the Game.
        <li class="settingsText">Enter your names:<br>
            <input class="nameField" type="text" value="" id="playerOne"> vs. <input class="nameField" type="text" value="" id="playerTwo">
            <li class="settingsText">Choose your Game Size: <br>
                <input type="number" value="3" id="gameSizeX" oninput="onGameSizeValueChange();"> x ` +
            `<input type="number" value="3" id="gameSizeY" disabled>
            </li>
            <li class="settingsText">Choose how many Fields are needed to win: <br>
                <input type="number" value="3" id="pointsToWin" oninput="onGameSizeValueChange();"></li>
            <li class="settingsText" id="startGameButton"><button class="startGameButton" onclick="settingsMenu()">Start the Game` +
            `</button></li>
    </ul>
</div>`);
}

/* -----------------------------------------------------------------------
  here starts AI Stuff! 
   -----------------------------------------------------------------------
The ai is based on the minimax algorythm. It loops through all possible moves (including next steps) in a tree diagram and then
rates these moves. The Variable maxDepth determines how many moves ahead our AI will look at.
*/

let maxDepth;
let curDifficulty = 0;
let playerGoesFirst = true;

function aiMode(difficulty, playAgain) {
    //at this point the minimax algorythm is able to solve gameFields up to 5x5
    if ($("#gameSizeX").val() > 5 || $("#gameSizeX").val() < 3) {
        alert("GameSize must be 3x3, 4x4 or 5x5!");
    } else {

        //the AI Will always take orange/playerTwo
        if (!playAgain) {
            let gX = $("#gameSizeX").val(); //gameSizeX
            let ptw = $("#pointsToWin").val(); //points To Win
            //set our player names visually on the right and left-hand side
            if ($("#playerOne").val() === "") playerNameOne = "<br> Player";
            else playerNameOne = `<br>${$("#playerOne").val()}`;
            $("#scoreL").html(playerNameOne);
            playerNameTwo = `<br> AI`;
            $("#scoreR").html(playerNameTwo);


            gameSize = gX;
            curDifficulty = difficulty;
            switch (difficulty) {
                case 1:
                    if (gameSize > 3) maxDepth = 2;
                    else maxDepth = 4;
                    break;
                case 2:
                    if (gameSize > 5) maxDepth = 2;
                    else if (gameSize > 3) maxDepth = 4;
                    else maxDepth = 6;
                    break;
                case 3:
                    if (gameSize > 5) maxDepth = 3;
                    else if (gameSize > 3) maxDepth = 5;
                    else maxDepth = 10;
                    break;
            }

            pointsToWin = ptw;
            gameRunning = true;
            inAiMode = true;
            initUI(gameSize, ptw);
            teamToMove = playerTwo;
            bestMove();

        }

        //player hit play again button
        else {
            gameRunning = true;
            inAiMode = true;
            initUI(gameSize, pointsToWin);
            //to obtain a better game experience
            if (playerGoesFirst) {
                currentColor = "#3F88C5";
                teamToMove = playerOne;
                $("#header").html(playerNameOne + ", it's your turn!");
                $("#header").css("color", currentColor);
                playerGoesFirst = false;
            } else {
                teamToMove = playerTwo;
                bestMove();
                playerGoesFirst = true;
            }
        }
    }
}

//this is the ai move
function bestMove() {
    let bestScore = -Infinity;
    let moveI;
    let moveJ;

    for (let i = 0; i < gameSize; i++) {
        for (let j = 0; j < gameSize; j++) {
            if (gameField[i][j] === "") {
                gameField[i][j] = playerTwo;
                let score = minimax(gameField, 0, false);
                gameField[i][j] = "";

                if (score > bestScore) {
                    bestScore = score;
                    moveI = i;
                    moveJ = j;
                }
            }
        }
    }
    gameField[moveI][moveJ] = playerTwo;
    changePlayer(moveI, moveJ);
}

let scores = {
    o: 100,
    b: -100,
    tie: 0,
};

function minimax(board, depth, isMaximizing) {
    let result = checkForWin();
    if (result !== null) {
        return scores[result];
        //we're at the end of the tree, gameState would be terminal
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < gameSize; i++) {
            for (let j = 0; j < gameSize; j++) {
                // Is the spot available?
                if (gameField[i][j] === "") {
                    let score = 0;
                    gameField[i][j] = playerTwo;
                    if (depth + 1 < maxDepth) {
                        score = minimax(board, depth + 1, false);
                    }
                    gameField[i][j] = "";
                    bestScore = Math.max(score, bestScore);
                }
            }
        }
        return bestScore - depth;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < gameSize; i++) {
            for (let j = 0; j < gameSize; j++) {
                // Is the spot available?
                if (gameField[i][j] === "") {
                    let score = 0;
                    gameField[i][j] = playerOne;
                    if (depth + 1 < maxDepth) {
                        score = minimax(board, depth + 1, true);
                    }
                    gameField[i][j] = "";
                    bestScore = Math.min(score, bestScore);
                }
            }
        }
        return bestScore + depth;
    }
}

function changePlayer(x, y) {
    //if the grid is still empty we can fill in our Team
    let chosenID = x + "" + y;
    gameField[x][y] = teamToMove;
    //change team thats on the move, add content to our Field and change Colors
    bumm.play();
    $("#" + chosenID)
        .children()
        .html("O");
    //$('#' + chosenID).childNodes[0].innerHTML = "O";
    currentColor = "#3F88C5";
    teamToMove = playerOne;
    $("#header").html(playerNameOne + ", it's your turn!");
    $("#header").css("color", currentColor);
    //call our function if we have a win situation
    winAI();
}

function winAI() {
    let isThereAWinner = checkForWin();
    if (isThereAWinner === "b") {
        console.log("the players has beaten the AI");
        win(playerOne);
    } else if (isThereAWinner === "o") {
        console.log("the Ai has beaten the player (once again)");
        win(playerTwo);
    } else if (isThereAWinner === "tie") {
        $("#header").html("There is no winner! We have a draw.");
        $("div.outer-grid").append(
            '<button class="resetButton" style="bottom: 7%;" onclick="playAgain()">Play again!</button>'
        );
        console.log("there's a tie now.");
    }
}