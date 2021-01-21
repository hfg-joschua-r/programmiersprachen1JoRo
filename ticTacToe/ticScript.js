//Create our variables
let currentColor = "";
let gameRunning = false;
let inAiMode = false;
let teamToMove = "";
let pointsToWin;
let gameSize; //We need this variable later on when it comes to check for wins
let gameField = [];
//store our points per Team
let pointsL = 0;
let pointsR = 0;
//store our player names
let playerNameOne;
let playerNameTwo;
//add the symbols for the player 
let playerOne = 'b';
let playerTwo = 'o';
//adding our some soundeffects here
let bumm = new Audio("./resources/audioFiles/bumm.wav"); 
let chack = new Audio("./resources/audioFiles/chack.flac");
let beep1 = new Audio("./resources/audioFiles/beep1.wav");
let beep2 = new Audio("./resources/audioFiles/beep2.wav");
let victory = new Audio("./resources/audioFiles/victory.mp3");

//We want to adjust our x or y value for our gamefield so that its only possible to create squares + adjust the player names to the left and right.
function onGameSizeValueChange() {
  $("#gameSizeY").val($("#gameSizeX").val());
  beep1.play();
}
$("#playerOne").on("input", function (e) {
  $("#scoreL").html(`<br>${$("#playerOne").val()}`);
  playerNameOne = `<br>${$("#playerOne").val()}`;
});
$("#playerTwo").on("input", function (e) {
  $("#scoreR").html(`<br>${$("#playerTwo").val()}`);
  playerNameTwo = `<br>${$("#playerTwo").val()}`;
});

//This defines our UI that pops up when the user opens the page to setup his game:
function settingsMenu() {

  //Get all values out of our Input fields for later use
  let gX = $("#gameSizeX").val(); //gameSizeX
  let gY = $("#gameSizeY").val(); //gameSizeY
  let ptw = $("#pointsToWin").val(); //points To Win
  playerNameOne = `<br>${$("#playerOne").val()}`;
  $("#scoreR").html(`<br>${$("#playerTwo").val()}`);
  playerNameTwo = `<br>${$("#playerTwo").val()}`;
  $("#scoreL").html(`<br>${$("#playerOne").val()}`);

  if (ptw > gX) {
    //bug: wenn 10x10 spielfeld kommen wir hier rein, unabhängig welchge ptw man wählt???
    console.log(ptw + " > " + gX);
    //
    alert("Points to win have to be less than the game Size!");
  } else {
    //currently we only support game fields up to a size of 10x10
    if (gX > 10) alert("The game field size can't be larger than 10!");
    else {
      if ($("#playerOne").val() != "" && $("#playerTwo").val() != "") {
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
function initUI(gameSizeY, p) {
  //Generate GameField
  //remove SettingsMenu
  $(".settingsContainer").remove();
  //At this point we only allow square GameFields
  gameSizeX = gameSizeY;
  gameSize = gameSizeY; //assign to store it in our script

  let curID = 0; //storing the current ID of the grid we wish to create
  let gridNumber = gameSizeX * gameSizeY;
  //calculate our Gridsize, which will be used later on to determine the absolute value of each cell/field
  let gridSize = (gameSizeX / gridNumber) * 100;
  for (let i = 0; i < gameSizeY; i++) {
    //fill our GameField array with the right amount of fields
    gameField.push([]);
    for (let j = 0; j < gameSizeX; j++) {
      gameField[i].push("");
      curID = i + "" + j;
      //Our grid is capsuled by our OuterGrid, and THEN our Outer Square, the single Grid Panel has an inner-grid and an inner-square
      $("div.outer-square").append(
        `<div id='${curID}'class='inner-grid' style='width: ${gridSize}%; height: ${gridSize}%'><div class='inner-square'></div></div>`
      );
    }
  }
  //add our Reset Game Button
  $("div.outer-grid").append(
    '<button class="resetButton" onclick="resetGame()">RESET GAME</button>'
  );
  //set the value of how many equal symbols in a line are needed to win a game
  pointsToWin = p;
  addEventListeners();
  if(!inAiMode) {
  determineStart();
  }
}

//Add event listeners to grids! For clicks and mouseOver effects/events
function addEventListeners() {
  let grids = document.getElementsByClassName("inner-grid");
  for (let i = 0; i < grids.length; i++) {
    grids[i].addEventListener("click", function () {
      if (gameRunning) handleGridClick(grids[i]);
    });

    grids[i].addEventListener("mouseover", function () {
      if (gameRunning) grids[i].style.setProperty("--grid-color", currentColor);
    });

    grids[i].addEventListener("mouseout", function () {
      if (gameRunning) grids[i].style.setProperty("--grid-color", "#ccc");
    });
  }
}

//pseudo-randomly determine which team should go first
function determineStart() {
  let random = Math.random();
  if (teamToMove == "") {
    //we tell our Script that the game is currently running
    gameRunning = true;
    if (random > 0.5) {
      //player One begins
      $("#header").html(playerNameOne + " begins!");
      $("#header").css("color", "#3F88C5");
      console.log("test!");
      currentColor = "#3F88C5";
      teamToMove = playerOne;
    } else {
      //player Two begins
      $("#header").html(playerNameTwo + " begins!");
      $("#header").css("color", "#e76f51");
      currentColor = "#e76f51";
      teamToMove = playerTwo;
    }
  } else {
    //bug: sometimes this is called twice, due to unknown reasons
    console.log("team to move is " + teamToMove);
  }
}

//this function is called everytime the user clicks on a field
function handleGridClick(selGrid) {
  //we determine the position of the current Grid by identifying it's id
  let pos = selGrid.id;
  //if the grid is still empty we can fill in our Team
  if (selGrid.childNodes[0].innerHTML === "") {
    gameField[pos[0]][pos[1]] = teamToMove;
    //change team thats on the move, add content to our Field and change Colors
    if (teamToMove === playerTwo) {
      bumm.play();
      selGrid.childNodes[0].innerHTML = "O";
      currentColor = "#3F88C5";
      teamToMove = playerOne;
      $("#header").html(playerNameOne + ", it's your turn!");
      $("#header").css("color", currentColor);
    }
    
    else if (teamToMove === playerOne) {
      chack.play();
      selGrid.childNodes[0].innerHTML = "X";
      teamToMove = playerTwo;
      currentColor = "#e76f51";
      $("#header").html(playerNameTwo + ", it's your turn!");
      $("#header").css("color", currentColor);
    }
  } else {
    $("#header").html("Please select an empty field!");
  }
  //call our function if we have a win situation
  checkForWin();
}

//Look for possible Wins
function checkForWin() {
  //log our current state of the gameField
  //we store each line in the grid in these variables
  let curLineV = "";
  let curLineH = "";

  let winner = null;

  //set our Win condition by repeating the teams letters the number of times
  let winCondition1 = playerOne.repeat(pointsToWin);
  let winCondition2 = playerTwo.repeat(pointsToWin);
  //checking vertical and horizontal wins
  for (let i = 0; i < gameSize; i++) {
    curLineV = "";
    curLineH = "";
    //loop through each and every Field
    for (let j = 0; j < gameField[i].length; j++) {
      //add the content of the field to our string
      curLineV += gameField[i][j];
      curLineH += gameField[j][i];
    }
    //check our generated strings against our winconditions
    if (curLineV.includes(winCondition1)) {
      win(playerOne, i); 
      return playerOne;
    }
    else if (curLineV.includes(winCondition2)) {
      win(playerOne, i); 
      return playerTwo;
    }

    if (curLineH.includes(winCondition1)){
      win(playerOne, i); 
      return playerOne;
    }
    else if (curLineH.includes(winCondition2)){
      win(playerOne, i); 
      return playerTwo;
    }
  }

  //check diagonals
  //diagonal line from the left top to the right bottom
  let curLineD = "";
  //diagonal line from the top right to the bottom left
  let curLineD2 = "";
  for (let i = 0; i < gameSize; i++) {
    //gameField[i][0] is our horizontal field
    //gameField[0][j] is our vertical field
    for (let j = 0; j < gameSize; j++) {
      //in here we check every single Gamefield from up left to down right
      curLineD = "";
      curLineD2 = "";
      //check that we dont try to acess values of our array, that do not exist (values which are out of our current boundary)
      if (i + (pointsToWin - 1) < gameSize) {
        if (j + (pointsToWin - 1) < gameSize) {
          for (let m = 0; m < pointsToWin; m++) {
            curLineD += gameField[i + m][j + m];
          }

          //check for win
          if (curLineD.includes(winCondition1)) {
            win(playerOne, i); 
            return playerOne;
          }
          else if (curLineD.includes(winCondition2)){
            win(playerOne, i); 
            return playerTwo;
          }
        }
      }
      if (j - (pointsToWin - 1) >= 0) {
        if (i + (pointsToWin - 1) < gameSize) {
          for (let m = 0; m < pointsToWin; m++) {
            curLineD2 += gameField[i + m][j - m];
          }
          if (curLineD2.includes(winCondition1)) {
            win(playerOne, i); 
            return playerOne;
          }
          else if (curLineD2.includes(winCondition2)) {
            win(playerOne, i); 
            return playerTwo;
          }
        }
      }
    }
  }
  let isThereAnEmptyFieldLeft = false;
  //check if our whole field is full, in which case we have a draw
  for (let i = 0; i < gameSize; i++) {
    for (let j = 0; j < gameSize; j++) {
      if (gameField[i][j] == "") {
        isThereAnEmptyFieldLeft = true;
      }
    }
  }
  //this is executed if we have a draw, we add our play Again button.
  if (!isThereAnEmptyFieldLeft) {
    $("#header").html("There is no winner! We have a draw.");
    $("div.outer-grid").append(
      '<button class="resetButton" style="bottom: 7%;" onclick="playAgain()">Play again!</button>'
    );
    return 'tie';
  }
  else {
    return winner;
  }
}

//if we have a win, all the effects etc. are added here
function win(team, winningIDs) {
  gameRunning = false;
  //we pause the game to prevent additional clicks on our grid and play the victory song
  victory.play();
  //Signalize which team has won
  if (team === "b") {
    pointsL += 1;
    $("#scoreL").html(pointsL + playerNameOne);
    $("#header").html(playerNameOne + " has Won!");
    $("#header").css("color", "#3F88C5"); //set to blue
    //toDO highlight winning line
  } else {
    pointsR += 1;
    $("#scoreR").html(pointsR + playerNameTwo);
    $("#header").html(playerNameTwo + " has Won!");
    $("#header").css("color", "#e76f51"); //set to orange
    //toDO: highlight winning line
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

//If the user wishes to play again, we just reset our current GameField, and keep all Settings & Points
function playAgain() {
  teamToMove = "";
  victory.pause();
  beep2.play();
  $(".pyro").remove();
  $(".inner-grid").remove();
  $(".resetButton").remove();
  gameField = [];
  currentColor = "";
  console.log("team to move is " + teamToMove);
  determineStart();
  initUI(gameSize, pointsToWin);
}

//If the user wishes to reset the game we call this function we bring up our SettingsUI and reset all current values
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
  pointsL = 0;
  pointsR = 0;
  $("#scoreL").html("");
  $("#scoreR").html("");
  openSettings();
}
function openSettings() {
  //add our settingsHTML to the outer-sqaure, so the user can change the current Game-Settings
  $(".outer-square").prepend(`<div class="settingsContainer">
  <ul class="settingsTextHeader">
    Click the button above to start the Game.
    <li class="settingsText">Enter your names:<br>
    <input class="nameField" type="text" value="" id="playerOne"> vs. <input class="nameField" type="text" value="" id="playerTwo">
    <li class="settingsText">Choose your Game Size: <br>
    <input type="number" value="3"  id="gameSizeX" oninput="onGameSizeValueChange();"> x <input type="number" value="3" id="gameSizeY" disabled>
    </li>
    <li class="settingsText">Choose how many Fields are needed to win: <br>
    <input type="number" value="3" id="pointsToWin" oninput="onGameSizeValueChange();"></li>
    <li class="settingsText"><button class="startGameButton" onclick="settingsMenu()">Start the Game</button></li>
  </ul>
</div>`);
}

/* -----------------------------------------------------------------------
  here starts the experimental AI Stuff! currenty WIP
   -----------------------------------------------------------------------
*/
//We start by only looking at 3x3, later on maybe at variable game fields!

//implemnt minimax 
//tipp von Flo: hardcode first move
//we need an array with possible moves
//tree diagram == recursive algorythm. 
//loop through all moves

//we need a new function to switch players
//replace o and b in CheckForWin with "teamname"!

//bug: die ai spielt gegen sich selber durch und hängt sich dann auf

function aiMode(){
  //the AI Will always take orange/playerTwo
  inAiMode = true;
  initUI(3,3);
  bestMove();

}

//this is the ai move
function bestMove(){ 
  console.log(gameField);
  let bestScore = -Infinity;
  let moveI;
  let moveJ; 

  for (let i = 0; i < 3; i++){
    for (let j = 0; j < 3; j++){
      if(gameField[i][j] == ''){
        gameField[i][j] = playerTwo;
        let score = minimax(gameField, 0, false);
        gameField[i][j] = '';
      
        if(score > bestScore) {
          bestScore = score;
          moveI = i;
          moveJ = j;
         
        }
      }
    }
  }
  gameField[moveI, moveJ] = playerTwo;
  changePlayer(moveI, moveJ)
}

let scores = {
    'b': 1,
    'o':-1,
    'tie':0
}

function minimax(board, depth, isMaximizing){
  let result = checkForWinAI();
  if(result !== null){
      console.log(gameField)
      return scores[result]
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available?
        if (gameField[i][j] == '') {
          gameField[i][j] = playerTwo;
          let score = minimax(board, depth + 1, false);
          gameField[i][j] = '';
          bestScore = Math.max(score, bestScore);
        }
      }
    }
    return bestScore;
  } 
  else {
    let bestScore = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available?
        if (gameField[i][j] == '') {
          gameField[i][j] = playerOne;
          let score = minimax(board, depth + 1, true);
          gameField[i][j] = '';
          bestScore = Math.min(score, bestScore);
        }
      }
    }
    return bestScore;
  }
}

function changePlayer(x, y) {
  //if the grid is still empty we can fill in our Team
    let chosenID = x + '' + y;
    gameField[x][y] = teamToMove;
    //change team thats on the move, add content to our Field and change Colors
      bumm.play();
      
     $('#' + chosenID).childNodes[0].innerHTML = "O";
      currentColor = "#3F88C5";
      teamToMove = playerOne;
      $("#header").html(playerNameOne + ", it's your turn!");
      $("#header").css("color", currentColor);
      //call our function if we have a win situation
      //checkForWin();
}

//Look for possible Wins
function checkForWinAI() {
  //log our current state of the gameField
  //we store each line in the grid in these variables
  let curLineV = "";
  let curLineH = "";

  let winner = null;

  //set our Win condition by repeating the teams letters the number of times
  let winCondition1 = playerOne.repeat(pointsToWin);
  let winCondition2 = playerTwo.repeat(pointsToWin);
  //checking vertical and horizontal wins
  for (let i = 0; i < gameSize; i++) {
    curLineV = "";
    curLineH = "";
    //loop through each and every Field
    for (let j = 0; j < gameField[i].length; j++) {
      //add the content of the field to our string
      curLineV += gameField[i][j];
      curLineH += gameField[j][i];
    }
    //check our generated strings against our winconditions
    if (curLineV.includes(winCondition1)) {
     
      return playerOne;
    }
    else if (curLineV.includes(winCondition2)) {
      
      return playerTwo;
    }

    if (curLineH.includes(winCondition1)){
      
      return playerOne;
    }
    else if (curLineH.includes(winCondition2)){
       
      return playerTwo;
    }
  }

  //check diagonals
  //diagonal line from the left top to the right bottom
  let curLineD = "";
  //diagonal line from the top right to the bottom left
  let curLineD2 = "";
  for (let i = 0; i < gameSize; i++) {
    //gameField[i][0] is our horizontal field
    //gameField[0][j] is our vertical field
    for (let j = 0; j < gameSize; j++) {
      //in here we check every single Gamefield from up left to down right
      curLineD = "";
      curLineD2 = "";
      //check that we dont try to acess values of our array, that do not exist (values which are out of our current boundary)
      if (i + (pointsToWin - 1) < gameSize) {
        if (j + (pointsToWin - 1) < gameSize) {
          for (let m = 0; m < pointsToWin; m++) {
            curLineD += gameField[i + m][j + m];
          }

          //check for win
          if (curLineD.includes(winCondition1)) {
           
            return playerOne;
          }
          else if (curLineD.includes(winCondition2)){
           
            return playerTwo;
          }
        }
      }
      if (j - (pointsToWin - 1) >= 0) {
        if (i + (pointsToWin - 1) < gameSize) {
          for (let m = 0; m < pointsToWin; m++) {
            curLineD2 += gameField[i + m][j - m];
          }
          if (curLineD2.includes(winCondition1)) {
          
            return playerOne;
          }
          else if (curLineD2.includes(winCondition2)) {
            
            return playerTwo;
          }
        }
      }
    }
  }
  let isThereAnEmptyFieldLeft = false;
  //check if our whole field is full, in which case we have a draw
  for (let i = 0; i < gameSize; i++) {
    for (let j = 0; j < gameSize; j++) {
      if (gameField[i][j] == "") {
        isThereAnEmptyFieldLeft = true;
      }
    }
  }
   //this is executed if we have a draw, we add our play Again button.
   if (!isThereAnEmptyFieldLeft) {
    $("#header").html("There is no winner! We have a draw.");
    $("div.outer-grid").append(
      '<button class="resetButton" style="bottom: 7%;" onclick="playAgain()">Play again!</button>'
    );
    return 'tie';
  }
  else {
    return winner;
  }
}
