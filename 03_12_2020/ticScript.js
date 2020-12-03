console.log("script loaded")
//decide who starts

function determineStart(){
    let random = Math.random();
    document.getElementById("header").onclick = null;
    if(random > 0.5){
        //blau beginnt
        document.getElementById("header").innerHTML = "Team Blau beginnt!"
        document.getElementById("header").style.color =  "#3F88C5";
    }
    else{
        document.getElementById("header").innerHTML = "Team Orange beginnt!"
        document.getElementById("header").style.color =  "#e76f51";
    }
}


function threeTimesthree(){
    /*toDO:  .inner-grid {
    width: 33.3%;
    height: 33.3%;
    border: 1px solid rgba(79, 79, 219, 0.705);
    display: table;
  } Need 9 divs*/
   let objs = document.getElementsByClassName('inner-grid').style
 
}
function fourTimesFour(){
    /*toDO:  .inner-grid {
    width: 25%;
    height: 25%;
    border: 1px solid rgba(79, 79, 219, 0.705);
    display: table;
  } 
  
  need 12 divs*/
}
function resetGame(){
    let objs = document.getElementsByClassName("inner-square")
    for(let i = 0; i < objs.length; i++){
        objs[i].innerHTML = "";
    }
    document.getElementById("header").style.color =  "#f4a261";
    document.getElementById("header").innerHTML = "Wer fängt an?"
    document.getElementById("header").onclick = 'determineStart()';
}
