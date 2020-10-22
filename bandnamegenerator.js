//array mit adjektiven
//array mit substantiven
let adjektive = ["incredible", "astonishing", "super duper", "sexy", "depressed", "frustrated", "extreme", "homeless", "clumsy"];
let substantive = ["Tigers", "Pandas", "mirrors", "feathers", "programmers", "policewomen/men"]
//function: combine random adjektiv mit random substantiv
let randomBandname = (adj, sub) => console.log("The " + adj + " " + sub);

randomBandname(adjektive[Math.floor(Math.random() * adjektive.length)], substantive[Math.floor(Math.random() * substantive.length)]);

//Teil 2: angleichen von adjektiven an artikel 
let artikel = ["der", "die", "das"]
let deAdjektive = ["bester", "schönster", "fleißigster"]
let mSingularSubstantive = ["Junge", "Herd", "Kapitän", "Vikinger"]
let fPlurarSubtantive = ["Prinzessinen", "Arbeiten", "Aufgaben", "Vollzugsanstalten"]
let dasSingualrSubstantive = ["Werk", "Baby", "Nutella", "Bananenbrot"]

let art = artikel[Math.floor(Math.random() * artikel.length)];
let deAdj = deAdjektive[Math.floor(Math.random() * deAdjektive.length)];

//switch case für der, die, das
switch (art) {
    case "der":
        console.log(art + " " + deAdj.substr(0, deAdj.length - 1) + " " + mSingularSubstantive[Math.floor(Math.random() * mSingularSubstantive.length)]);
        break;
    case "die":
        deAdj = deAdj.substr(0, deAdj.length - 1);
        console.log(art + " " + deAdj.concat("n") + " " + fPlurarSubtantive[Math.floor(Math.random() * fPlurarSubtantive.length)]);
        break;
    case "das":
        console.log(art + " " + deAdj.substr(0, deAdj.length - 1) + " " + dasSingualrSubstantive[Math.floor(Math.random() * dasSingualrSubstantive.length)]);
        break;
}