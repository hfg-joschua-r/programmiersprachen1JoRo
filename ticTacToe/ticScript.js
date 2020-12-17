console.log("script loaded");
//decide who starts
let currentColor = "";
let gameRunning = false;
let teamToMove = "";
let gameField = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
]

let grids = document.getElementsByClassName("inner-grid");
//Add event listeners to grids!
function addEventListeners() {
    for (let i = 0; i < grids.length; i++) {
        grids[i].addEventListener('click', function () {
            if(gameRunning)
            handleGridClick(grids[i]);
        });

        grids[i].addEventListener('mouseover', function () {
            if(gameRunning)
            grids[i].style.setProperty('--grid-color', currentColor)
        })

        grids[i].addEventListener('mouseout', function () {
            if(gameRunning)
            grids[i].style.setProperty('--grid-color', "#ccc");
        })
    }
}
addEventListeners();

function determineStart() {
    let random = Math.random();
    gameRunning = true;
    if (teamToMove === "") {
        if (random > 0.5) {
            //blau beginnt
            document.getElementById("header").innerHTML = "Team blue begins!"
            document.getElementById("header").style.color = "#3F88C5";
            currentColor = "#3F88C5";
            teamToMove = "b";
        }
        else {
            document.getElementById("header").innerHTML = "Team orange begins!"
            document.getElementById("header").style.color = "#e76f51";
            currentColor = "#e76f51";
            teamToMove = "o";
        }
    }
    else {
        alert("If you wanna restart the game press the button below");
    }
}

function handleGridClick(selGrid) { //handle clicks received by function
    let pos = selGrid.id;
    gameField[pos[0]][pos[1]] = teamToMove;
    if (selGrid.childNodes[1].innerHTML === "") {
        if (teamToMove === "o") {
            selGrid.childNodes[1].innerHTML = "O";
            currentColor = "#3F88C5";
            teamToMove = "b";
            document.getElementById("header").style.color = "#3F88C5";
            document.getElementById("header").innerHTML = "Blue, it's your turn!";

        }
        else if (teamToMove === "b") {
            selGrid.childNodes[1].innerHTML = "X";
            teamToMove = "o";
            currentColor = "#e76f51";
            document.getElementById("header").style.color ="#e76f51";
            document.getElementById("header").innerHTML = "Orange, it's your turn!";
        }
    }
    else {
        document.getElementById("header").innerHTML;
    }
    winCheck2();
}
//es gibt 9 gewinn patterns, diese werden hier abgefragt
function winCheck2() {
    console.log(gameField)
    for (let i = 0; i < 3; i++) {
        //vertikal
        if (gameField[0][i] != "" && gameField[0][i] === gameField[1][i] && gameField[1][i] === gameField[2][i]) {
            console.log("we have a winner!")
            win(gameField[0][i], "0" + i, "1" + i, "2" + i);
        }
        //horizontal
        if (gameField[i][0] != "" && gameField[i][0] === gameField[i][1] && gameField[i][0] === gameField[i][2]) {
            console.log("we have a horizontal winner")
            win(gameField[i][0],i + "0", i + "1", i + "2");
        }
    }
    //diagonal von oben links nach unten rechts
    if (gameField[0][0] != "" && gameField[0][0] === gameField[1][1] && gameField[0][0] === gameField[2][2]) {
        console.log("we have a diagonal winner")
        win(gameField[0][0], "00","11","22");
    }
    if (gameField[0][2] != "" && gameField[0][2] === gameField[1][1] && gameField[0][2] === gameField[2][0]) {
        console.log("we have a diagonal winner");
        win(gameField[0][2],"02", "11", "20");
    }
}
function win(team, id1, id2, id3) {
    console.log("IDS are: " + id1 + id2 + id3)
    gameRunning = false;
    if (team === "b") {
        document.getElementById("header").style.color = "#3F88C5";
        document.getElementById("header").innerHTML = "The blue team has Won!";
        document.getElementById(id1).style.setProperty('--grid-color', "#3F88C5");
        document.getElementById(id2).style.setProperty('--grid-color', "#3F88C5");
        document.getElementById(id3).style.setProperty('--grid-color', "#3F88C5");
    }
    else {
        //alert("The orange team has Won!")
        document.getElementById("header").style.color = "#e76f51";
        document.getElementById("header").innerHTML = "The orange team has Won!";
        document.getElementById(id1).style.setProperty('--grid-color', "#e76f51");
        document.getElementById(id2).style.setProperty('--grid-color', "#e76f51");
        document.getElementById(id3).style.setProperty('--grid-color', "#e76f51");
    }
    //Input our beautiful Confetti effect!, insertAdjacentHTML doesnt changes our Mouseevents.
    document.getElementById("outerGrid").insertAdjacentHTML('beforeend', '<div class="pyro" id="py"> <div class="before"></div> <div class="after"></div> </div>');
}


function resetGame() {
    let objs = document.getElementsByClassName("inner-square")
    for (let i = 0; i < objs.length; i++) {
        objs[i].innerHTML = "";
    }
    currentColor = "";
    teamToMove = "";
    document.getElementById("header").style.color = "#f4a261";
    document.getElementById("header").innerHTML = "Wer fängt an?"
    document.getElementById("header").onclick = determineStart();
    gameField = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
    if (document.getElementById("py") != null) {
        let pyro = document.getElementById("py");
        pyro.remove();
    }
    //reset grid colors:
    let grids = document.getElementsByClassName("inner-grid");
    for (let i = 0; i < grids.length; i++) {
        grids[i].style.setProperty('--grid-color', "#ccc")
    }
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
*/
