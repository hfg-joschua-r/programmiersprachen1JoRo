var fs = require("fs");
var inputTXT = fs.readFileSync("./day5input.txt").toString();
var input = inputTXT.split("\n")
let highestTicketID = 0;
input.forEach((seat, index) => {
    let curMin
    let curMax
    let curRange = 127;
    let seatRow
    let seatColumn
    let ticketID

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
    curRange = Math.ceil(curMax - curMin);
   // console.log("Seatrow is: " + seatRow)
  
    //determing exact seat:
    if(seat[7] === "R"){
        curMin = 4;
    }
    else if(seat[7] === "L"){
        curMax = 3;
    }
    curRange = Math.ceil(curMax - curMin);

    if(seat[8] === "R"){
        curMin = (curMin + Math.ceil(curRange/2));
    }
    else if(seat[8] === "L"){
        curMax = (curMax - Math.ceil(curRange/2));
    }
    curRange = Math.ceil(curMax - curMin);

    if(seat[9] === "R"){
        curMin = (curMin + Math.ceil(curRange/2));
        seatColumn = curMin;
    }
    
    else if(seat[9] === "L"){
        curMax = (curMax - Math.ceil(curRange/2));
        seatColumn = curMax
    }
   // console.log("Seatrow is: " + seatRow + " at Column: " + seatColumn)
    console.log(seatRow)
    if(seatRow == 0){
    console.log("break! doesnt exist")
    }
    else{
        ticketID = seatRow * 8 + seatColumn;
        //console.log("TicketID " + ticketID)
        if(ticketID > highestTicketID){
            highestTicketID = ticketID;
        }
    }
   
})

console.log("Highest ticket id is: " + highestTicketID);