var fs = require("fs");
var inputTXT = fs.readFileSync("./day5input.txt").toString();
var input = inputTXT.split("\n")

input.forEach((seat, index) => {
    let curMin
    let curMax
    let curRange = 127;
    let seatRow
    if(seat[0] == "F"){
        curMin = 0;
        curMax = 63;
        curRange = Math.ceil(curMax - curMin);
    }
    else{
        curMin = 64;
        curMax = 127;
        curRange = Math.ceil(curMax - curMin);
    }

    if(seat[1] === "F"){
        //min bleibt gleich
        curMax = curMax - Math.ceil(curRange / 2)
        //console.log("range is = " + curRange + " From to: " + curMin + " "+ curMax);
    }
    else if(seat[1] === "B"){
        //max bleibt gleich
        curMin = (curMin + Math.ceil(curRange / 2))
        //console.log("range is = " + curRange + " From to: " + curMin + " " + curMax);
    }

    curRange = Math.ceil(curMax - curMin);
    if(seat[2] === "F"){
        //min bleibt gleich
        curMax = curMax - Math.ceil(curRange / 2)
        //console.log("range is = " + curRange + " From to: " + curMin + " "+ curMax);
    }
    else if(seat[2] === "B"){
        //max bleibt gleich
        curMin = (curMin + Math.ceil(curRange / 2))
        //console.log("range is = " + curRange + " From to: " + curMin + " " + curMax);
    }
    curRange = Math.ceil(curMax - curMin);
    if(seat[3] === "F"){
        //min bleibt gleich
        curMax = curMax - Math.ceil(curRange / 2)
        //console.log("range is = " + curRange + " From to: " + curMin + " "+ curMax);
    }
    else if(seat[3] === "B"){
        //max bleibt gleich
        curMin = (curMin + Math.ceil(curRange / 2))
        //console.log("range is = " + curRange + " From to: " + curMin + " " + curMax);
    }
    curRange = Math.ceil(curMax - curMin);
    if(seat[4] === "F"){
        //min bleibt gleich
        curMax = curMax - Math.ceil(curRange / 2)
        //console.log("range is = " + curRange + " From to: " + curMin + " "+ curMax);
    }
    else if(seat[4] === "B"){
        //max bleibt gleich
        curMin = (curMin + Math.ceil(curRange / 2))
        //console.log("range is = " + curRange + " From to: " + curMin + " " + curMax);
    }
    curRange = Math.ceil(curMax - curMin);
    if(seat[5] === "F"){
        //min bleibt gleich
        curMax = curMax - Math.ceil(curRange / 2)
        //console.log("range is = " + curRange + " From to: " + curMin + " "+ curMax);
    }
    else if(seat[5] === "B"){
        //max bleibt gleich
        curMin = (curMin + Math.ceil(curRange / 2))
        //console.log("range is = " + curRange + " From to: " + curMin + " " + curMax);
    }
    curRange = Math.ceil(curMax - curMin);
    if(seat[6] === "F"){
        //min bleibt gleich
        curMax = curMax - Math.ceil(curRange / 2)
        //console.log("range is = " + curRange + " From to: " + curMin + " "+ curMax);
        seatRow = curMin;
    }
    else if(seat[6] === "B"){
        //max bleibt gleich
        curMin = (curMin + Math.ceil(curRange / 2))
        //console.log("range is = " + curRange + " From to: " + curMin + " " + curMax);
        seatRow = curMax;
    }
    curMax = 7;
    curMin = 0;
    console.log("Seatrow is: " + seatRow)
    
    //determing exact seat:
    if(seat[7] === "R"){

    }
    else if(seat[7] === "L"){
        
    }
})