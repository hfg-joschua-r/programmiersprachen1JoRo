//array mit adjektiven
//array mit substantiven
let adjektive = ["incredible", "astonishing", "super duper", "sexy", "depressed", "frustrated", "extreme", "homeless", "clumsy"];
let substantive = ["Tigers", "Pandas", "mirrors", "feathers", "programmers", "policewomen/men"]
//function: combine random adjektiv mit random substantiv
let randomBandname = (adj, sub) => console.log("The " + adj + " " + sub);

randomBandname(adjektive[Math.floor(Math.random() * adjektive.length)], substantive[Math.floor(Math.random() * substantive.length)]);

//Teil 2: angleichen von adjektiven an artikel 
let artikel = ["der", "die", "das"];
let deAdjektive = ["bester", "schönster", "fleißigster"]

let art = artikel[Math.floor(Math.random() * artikel.length)];
let deAdj = deAdjektive[Math.floor(Math.random() * deAdjektive.length)];

//switch case für der, die, das
switch (art) {
    case "der":
        console.log(art + " " + deAdj.substr(0, deAdj.length - 1));
        break;
    case "die":
        deAdj = deAdj.substr(0, deAdj.length - 1);
        console.log(art + " " + deAdj.concat("n"));
        break;
    case "das":
        console.log(art + " " + deAdj.substr(0, deAdj.length - 1));
        break;
}