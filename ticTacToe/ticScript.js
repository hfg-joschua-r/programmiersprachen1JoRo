console.log("script loaded");
//decide who starts
let currentColor = "";
let gameRunning = false;
let teamToMove = "";
let pointsToWin;
let gameSize; //We need this variable later on when it comes to check for wins
let gameField = [];
//adding our some soundeffects here 
let bumm = new Audio("bumm.wav");
let chack = new Audio("chack.flac");
let beep1 = new Audio("beep1.wav");
let beep2 = new Audio("beep2.wav");
let victory = new Audio("victory.mp3");

//We want to adjust our x or y value for our gamefield so that its only possible to create squares
function onGameSizeValueChange(){
  $("#gameSizeY").val($("#gameSizeX").val());
  beep1.play();
}

//This defines our UI that pops up when the user opens the page to setup his game:
function settingsMenu() {
  let gX = $("#gameSizeX").val(); //gameSizeX
  let gY = $("#gameSizeY").val(); //gameSizeY
  let ptw = $("#pointsToWin").val(); //points TO Win
  //toDO: lock second input and adjust val
  if (gX != gY) alert("The game field must have the same value!");
  else {
    if (ptw > gX) {
      //bug: wenn 10x10 spielfeld kommen wir hier rein, unabhängig welchge ptw man wählt???
      console.log(ptw + " > " + gX);
      alert("Points to win have to be less than the game Size!");
    } else {
      //currently we only support game fields up to a size of 10x10
      if (gX > 10) alert("The game field size can't be larger than 10!");
      else {
        //tell our UI to load
        initUI(gX, ptw);
        beep2.play();
      }
    }
  }
}
//New function: initialize UI with given parameters! gameSize = size of GameField pointsToWin = number of Points needed to win the game
function initUI(gameSizeY, p) {
  //Generate GameField
  //removeSettingsMenu
  $(".settingsContainer").remove();
  //At this point we only allow square GameFields
  gameSizeX = gameSizeY;
  gameSize = gameSizeY; //assign to store it in our script
  let curID = 0; //storing the current ID of the single grid
  let gridNumber = gameSizeX * gameSizeY;
  //ToDo: change style width and height attributes
  let gridSize = (gameSizeX / gridNumber) * 100;
  for (let i = 0; i < gameSizeY; i++) {
    //fill our GameField array with the right size
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
  //add ResetGameButton
  $("div.outer-grid").append(
    '<button class="resetButton" onclick="resetGame()">RESET GAME</button>'
  );
  //set pointsToWin
  pointsToWin = p;
  addEventListeners();
  determineStart();
}

//Add event listeners to grids! For clicks and mouseOver effects
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
//determine which team should go first
function determineStart() {
  let random = Math.random();
  if (teamToMove === "") {
    gameRunning = true;
    if (random > 0.5) {
      //blau begins 
      $("#header").html("Team blue begins!");
      $("#header").css.color = "#3F88C5";
      //document.getElementById("header").innerHTML = "Team blue begins!";
      //document.getElementById("header").style.color = "#3F88C5";
      currentColor = "#3F88C5";
      teamToMove = "b";
    } else {
      //orange begins
      $("#header").html("Team orange begins!");
      $("#header").css.color = "#e76f51";
      //document.getElementById("header").innerHTML = "Team orange begins!";
      //document.getElementById("header").style.color = "#e76f51";
      currentColor = "#e76f51";
      teamToMove = "o";
    }
  } else {
    alert("If you wanna restart the game press the button below");
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
    if (teamToMove === "o") {
      bumm.play();
      selGrid.childNodes[0].innerHTML = "O";
      currentColor = "#3F88C5";
      teamToMove = "b";
      $("#header").html("Blue, it's your turn!");
      $("#header").css.color = currentColor;
    } else if (teamToMove === "b") {
      chack.play();
      selGrid.childNodes[0].innerHTML = "X";
      teamToMove = "o";
      currentColor = "#e76f51";
      $("#header").html("Orange, it's your turn!");
      $("#header").css.color = currentColor;
    }
  } else {
    $("#header").html("Please select an empty field!");
  }
  //winCheck2();
  //call our function if we have a win situation
  checkForWin();
}

//Look for possible Wins
function checkForWin() {
  //log our current state of the gameField
  console.log(gameField);
  //we store our lines of the grid in these variables
  let curLineV = "";
  let curLineH = "";
  
  //set our Win condition by repeating the teams letters the number of times
  let winCondition1 = "b".repeat(pointsToWin);
  let winCondition2 = "o".repeat(pointsToWin);
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
    if (curLineV.includes(winCondition1)) win("b", i);
    else if (curLineV.includes(winCondition2)) win("o", i);

    if (curLineH.includes(winCondition1)) win("b", i);
    else if (curLineH.includes(winCondition2)) win("o", i);
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
      //check that we dont try to acess values of our array, that do not exist
      if (i + (pointsToWin - 1) < gameSize) {
        if (j + (pointsToWin - 1) < gameSize) {
          for(let m = 0; m < pointsToWin; m ++){
            curLineD += gameField[i + m][j + m];
          }
          //console.log(curLineD);
          //curLineD = gameField[i][j] + gameField[i + 1][j + 1] + gameField[i + 2][j + 2];

          //check for win
          if (curLineD.includes(winCondition1)) win("b", i);
          else if (curLineD.includes(winCondition2)) win("o", i);
        }
      }
      if(j - (pointsToWin - 1) >= 0) {
        console.log("we in")
        if(i + (pointsToWin - 1) < gameSize){
          for(let m = 0; m < pointsToWin; m ++){
            curLineD2 += gameField[i + m][j - m];
          }
          console.log(curLineD2);
          if (curLineD2.includes(winCondition1)) win("b", i);
          else if (curLineD2.includes(winCondition2)) win("o", i);
        }
      }

    }
  }
}

//if we have a win, all the effects etc. are added here:
function win(team, winningIDs) {
  gameRunning = false;
  //we pause the game to prevent additional clicks on our grid and play the victory song
  victory.play();
  //Signalize which team has won
  if (team === "b") {
    $("#header").html("The blue team has Won!");
    $("#header").css.color = "#3F88C5"; //set to blue
    //toDO highlight winning line
  } else {
    $("#header").html("The orange team has Won!");
    $("#header").css.color = "#e76f51"; //set to orange
    //toDO: highlight winning line
  }
  //Input our beautiful Confetti effect!, insertAdjacentHTML doesnt changes our Mouseevents.
  $(".outer-grid").before(
    '<div class="pyro" id="py"> <div class="before"></div> <div class="after"></div> </div>'
  );
  $(".outer-square").prepend(
    '<div class="pyro" id="py"> <div class="before"></div> <div class="after"></div> </div>'
  );
}

//If the user wishes to reset the game we call this function we reset our game to the UI
//ToDo: add option to play another Game, add Count of rounds won by each team 
function resetGame() {
  victory.pause();
  beep2.play();
  currentColor = "";
  teamToMove = "";
  $("#header").html("Wer fängt an?");
  $("#header").css.color = "#f4a261"; //set to default color
  $(".pyro").remove();
  $(".inner-grid").remove();
  $(".resetButton").remove();
  gameField = [];
  openSettings();
}
function openSettings() {
  //add our settingsHTML
  $(".outer-square").prepend(`<div class="settingsContainer">
  <ul class="settingsTextHeader">
    Click the button above to start the Game.
    <li class="settingsText">Choose your Game Size: <br>
    <input type="number" value="3" id="gameSizeX" oninput="onGameSizeValueChange();"> x <input type="number" value="3"  id="gameSizeY" disabled>
    </li>
    <li class="settingsText">Choose how many Fields are needed to win: <br>
    <input type="number" value="3" id="pointsToWin" oninput="onGameSizeValueChange();"></li>
    <li class="settingsText"><button class="startGameButton" onclick="settingsMenu()">Start the Game</button></li>
  </ul>
</div>`);
}

/*Obsolete Code, interesting nonetheless
//early tries at implementing a 4x4 grid, having them load dynmically etc. 
function threeTimesthree() {
    toDO:  .inner-grid {
    width: 33.3%;
    height: 33.3%;
    border: 1px solid rgba(79, 79, 219, 0.705);
    display: table;
  } Need 9 divs
  let objs = document.getElementsByClassName('inner-grid').style

}
function fourTimesFour() {
    toDO:  .inner-grid {
    width: 25%;
    height: 25%;
    border: 1px solid rgba(79, 79, 219, 0.705);
    display: table;
  } 
  
  need 12 divs
}

//das ist obsolet, dynamische gewinnüberprüfung bisher nicht möglich da die längen des arraysd überschritten werden
function winCheck(y,x){
    gameField[y][x] = teamToMove;
    console.log(y + " "+ x);
    console.log(gameField);
    //vertikaler gewinn
    let test = y +1;
    console.log(gameField[2][x]);
    if(gameField[y+1][x] === teamToMove && gameField[y+2][x] === teamToMove){
        //gewinn
        console.log("we have a winner!")
    }
    else if(gameField[y-1][x] === teamToMove && gameField[y-2][x] === teamToMove){
        //gewinn
        console.log("we have a winner!")
    }
    else if(gameField[y-1][x] === teamToMove && gameField[y+1][x] === teamToMove){
        //gewinn
        console.log("we have a winner!")
    }
    //horizontaler gewinn
    if(gameField[y][x+1] === teamToMove && gameField[y][x + 2] === teamToMove){
        //gewinn
        console.log("we have a winner!")
    }
    else if(gameField[y][x-1] === teamToMove && gameField[y][x -2] === teamToMove){
        //gewinn
        console.log("we have a winner!")
    }
    else if(gameField[y][x-1] === teamToMove && gameField[y][x +1] === teamToMove){
        //gewinn
        console.log("we have a winner!")
    }
    //diagonaler gewinn
    if(gameField[y+1][x+1] === teamToMove && gameField[y+2][x+2] === teamToMove){
        //gewinn
        console.log("we have a winner!")
    }
    else if(gameField[y-1][x-1] === teamToMove && gameField[y-2][x-2] === teamToMove){
        //gewinn
        console.log("we have a winner!")
    }
}
function winCheck2() {
  console.log(gameField);
  for (let i = 0; i < 3; i++) {
    if (
      gameField[0][i] != "" &&
      gameField[0][i] === gameField[1][i] &&
      gameField[1][i] === gameField[2][i]
    ) {
      console.log("we have a winner!");
      win(gameField[0][i], "0" + i, "1" + i, "2" + i);
    }
    //horizontal
    if (
      gameField[i][0] != "" &&
      gameField[i][0] === gameField[i][1] &&
      gameField[i][0] === gameField[i][2]
    ) {
      console.log("we have a horizontal winner");
      win(gameField[i][0], i + "0", i + "1", i + "2");
    }
  }
  //diagonal von oben links nach unten rechts
  if (
    gameField[0][0] != "" &&
    gameField[0][0] === gameField[1][1] &&
    gameField[0][0] === gameField[2][2]
  ) {
    console.log("we have a diagonal winner");
    win(gameField[0][0], "00", "11", "22");
  }
  if (
    gameField[0][2] != "" &&
    gameField[0][2] === gameField[1][1] &&
    gameField[0][2] === gameField[2][0]
  ) {
    console.log("we have a diagonal winner");
    win(gameField[0][2], "02", "11", "20");
  }
}
*/
