console.log("script loaded")
//decide who starts
let currentColor = "";
let teamToMove = "";
let gameField = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
]

//Add event listeners to grids!
let grids = document.getElementsByClassName("inner-grid");
for (let i = 0; i < grids.length; i++) {
    grids[i].addEventListener('click', function () {
        handleGridClick(grids[i]);
    });

    grids[i].addEventListener('mouseover', function () {
        grids[i].style.setProperty('--grid-color', currentColor)
    })

    grids[i].addEventListener('mouseout', function () {
        grids[i].style.setProperty('--grid-color', "#ccc");
    })
}

function determineStart() {
    let random = Math.random();
    if (teamToMove === "") {

        if (random > 0.5) {
            //blau beginnt
            document.getElementById("header").innerHTML = "Team Blau beginnt!"
            document.getElementById("header").style.color = "#3F88C5";
            currentColor = "#3F88C5";
            teamToMove = "b";
        }
        else {
            document.getElementById("header").innerHTML = "Team Orange beginnt!"
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
    let pos= selGrid.id;
    //winCheck(pos[0], pos[1]);
    gameField[pos[0]][pos[1]] = teamToMove;
    if(selGrid.childNodes[1].innerHTML === ""){
    if (teamToMove === "o") {
        selGrid.childNodes[1].innerHTML = "O";
        currentColor = "#3F88C5";
        teamToMove = "b";
        
    }
    else if (teamToMove === "b") {
        selGrid.childNodes[1].innerHTML = "X";
        teamToMove = "o";
        currentColor = "#e76f51";
    }
    }
    else{
        alert("please choose an empty grid!");
    }
    
    
   
    winCheck2();
}
//es gibt 9 gewinn patterns, diese werden hier abgefragt
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
function winCheck2(){
    console.log(gameField)
    for(let i = 0; i < 3; i++){
        //vertikal
        if(gameField[0][i] != "" && gameField[0][i] === gameField[1][i] && gameField[1][i] === gameField[2][i]){
            console.log("we have a winner!")
            win();
        }
        //horizontal
        if(gameField[i][0] != "" && gameField[i][0] === gameField[i][1] && gameField[i][0] === gameField[i][2]){
            console.log("we have a horizontal winner")
            win();
        }
    }
    //diagonal von oben links nach unten rechts
    if(gameField[0][0] != "" && gameField[0][0] === gameField[1][1] && gameField[0][0] === gameField[2][2]){
        console.log("we have a diagonal winner")
        win();
    }
    if(gameField[0][2] != "" && gameField[0][2] === gameField[1][1] && gameField[0][2] === gameField[2][0]){
        console.log("we have a diagonal winner");
        win();
    }
}
function win(){
    document.getElementById("outerGrid").innerHTML =  document.body.innerHTML +'<div class="pyro"> <div class="before"></div> <div class="after"></div> </div>' ;
}
function threeTimesthree() {
    /*toDO:  .inner-grid {
    width: 33.3%;
    height: 33.3%;
    border: 1px solid rgba(79, 79, 219, 0.705);
    display: table;
  } Need 9 divs*/
    let objs = document.getElementsByClassName('inner-grid').style

}
function fourTimesFour() {
    /*toDO:  .inner-grid {
    width: 25%;
    height: 25%;
    border: 1px solid rgba(79, 79, 219, 0.705);
    display: table;
  } 
  
  need 12 divs*/
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
}
