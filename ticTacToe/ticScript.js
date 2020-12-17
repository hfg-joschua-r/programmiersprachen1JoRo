console.log("script loaded");
//decide who starts
let currentColor = "";
let gameRunning = false;
let teamToMove = "";
let pointsToWin;
let gameSize; //We need this variable later on when it comes to check for wins
let gameField = [];

//This defines our UI that pops up when the user opens the page to setup his game:
function settingsMenu() {
  let gX = $("#gameSizeX").val(); //gameSizeX
  let gY = $("#gameSizeY").val(); //gameSizeY
  let ptw = $("#pointsToWin").val(); //points TO Win
  //toDO: lock second input and adjust val
  if (gX != gY) alert("The game field must have the same value!");
  else {
    if (ptw >= gX){
      //bug: wenn 10x10 spielfeld kommen wir hier rein, unabhängig welchge ptw man wählt
       console.log(ptw + ">" + gX);
    alert("Points to win have to be less than the game Size!");
    }
    else {
      if(gX > 10) alert("The game field size can't be larger than 10!")
      else{
      initUI(gX, ptw);
      }
    }
  }
}
//New function: initialize UI with given parameters! gameSize = size of GameField pointsToWin = number of
function initUI(gameSizeY, p) {
  //Generate GameField
  //removeSettingsMenu
  $(".settingsContainer").remove();

  //At this point we only allow square GameFields
  gameSizeX = gameSizeY;
  gameSize = gameSizeY; //assign to store it in our script
  let curID = 0;
  let gridNumber = gameSizeX * gameSizeY;
  //ToDo: change style width and height attributes
  let gridSize = (gameSizeX / gridNumber) * 100;
  for (let i = 0; i < gameSizeY; i++) {
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
  //set pointsToWin
  pointsToWin = p;
  addEventListeners();
  determineStart();
}

//Add event listeners to grids!
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

function determineStart() {
  let random = Math.random();
  console.log(teamToMove);
  if (teamToMove === "") {
    gameRunning = true;
    if (random > 0.5) {
      //blau beginnt
      $("#header").html("Team blue begins!");
      $("#header").css.color = "#3F88C5";
      //document.getElementById("header").innerHTML = "Team blue begins!";
      //document.getElementById("header").style.color = "#3F88C5";
      currentColor = "#3F88C5";
      teamToMove = "b";
    } else {
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

function handleGridClick(selGrid) {
  //handle clicks received by function
  let pos = selGrid.id;
  if (selGrid.childNodes[0].innerHTML === "") {
    gameField[pos[0]][pos[1]] = teamToMove;
    if (teamToMove === "o") {
      selGrid.childNodes[0].innerHTML = "O";
      currentColor = "#3F88C5";
      teamToMove = "b";
      $("#header").html("Blue, it's your turn!");
      $("#header").css.color = currentColor;
    } else if (teamToMove === "b") {
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
  checkForWin();
}

//es gibt 9 gewinn patterns, diese werden hier abgefragt
function checkForWin() {
  console.log(gameField);
  let curLineV = "";
  let curLineH = "";
  //checking vertical and horizontal wins
  for (let i = 0; i < gameSize; i++) {
    curLineV = "";
    curLineH = "";

    let winCondition1 = "b".repeat(pointsToWin);
    let winCondition2 = "o".repeat(pointsToWin);
    //checking verticals:
    for (let j = 0; j < gameField[i].length; j++) {
      curLineV += gameField[i][j];
      curLineH += gameField[j][i];
    }
    if (curLineV.includes(winCondition1)) win("b", i);
    else if (curLineV.includes(winCondition2)) win("o", i);

    if (curLineH.includes(winCondition1)) win("b", i);
    else if (curLineH.includes(winCondition2)) win("o", i);
  }
}

function win(team, winningIDs) {
  gameRunning = false;
  if (team === "b") {
    $("#header").html("The blue team has Won!");
    $("#header").css.color = "#3F88C5"; //set to blue
    //toDO highlight winning line
  } else {
    $("#header").html("The orange team has Won!");
    $("#header").css.color = "#e76f51"; //set to orange
    //toDO highlight winning line
  }
  //Input our beautiful Confetti effect!, insertAdjacentHTML doesnt changes our Mouseevents.
  $(".outer-grid").before(
    '<div class="pyro" id="py"> <div class="before"></div> <div class="after"></div> </div>'
  );
  $(".outer-square").prepend(
    '<div class="pyro" id="py"> <div class="before"></div> <div class="after"></div> </div>'
  );
}

function resetGame() {
  currentColor = "";
  teamToMove = "";
  $("#header").html("Wer fängt an?");
  $("#header").css.color = "#f4a261"; //set to default color
  $(".pyro").remove();
  $(".inner-grid").remove();
  gameField = [];
  openSettings();
}
function openSettings() {
  //add our settingsHTML
  $(".outer-square").prepend(`<div class="settingsContainer">
  <ul class="settingsTextHeader">
    Click the button above to start the Game.
    <li class="settingsText">Choose your Game Size: <br>
    <input type="number" value="3" id="gameSizeX"> x <input type="number" value="3"  id="gameSizeY">
    </li>
    <li class="settingsText">Choose how many Fields are needed to win: <br>
    <input type="number" value="3" id="pointsToWin"></li>
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
