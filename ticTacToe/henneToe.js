let fieldArray = [];
function start() {
    for (let i = 0; i < 3; i++) {
        //create Array für jede Zeile
        fieldArray.push([]);
            for (let t = 0; t < 3; t++) {
                //create Array für jedes Feld
                fieldArray[i].push("");
            }
}
}
start();
//id=Zelle" + i + t + 
clickPlayer("Zelle01")
function clickPlayer(id) {

    id = id.replace("Zelle", "")
    let zeile = id[0];
    let reihe = id[1];
    
    fieldArray[zeile][reihe] = "x";
    console.log(fieldArray)
}