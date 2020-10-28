const Der = { article: "Der", plural: false }
const Die = { article: "Die", plural: false }
const Das = { article: "Das", plural: false }
const DiePl = { article: "Die", plural: true }

let artikel = [Der, Die, Das, DiePl]
let adjektive = ["groß", "wunderbar", "einzigartig", "unverständlich"]
let mSubstantive = ["Performer", "Reiter", "Knecht"]
let fSubstantive = ["Marmelade", "Kuh", "Schnecke"]
let dSubstantive = ["Quartett", "Gewitter", "Abendprogramm"]
let pSubstantive = ["Musketiere", "Programmierer", "Verlierer"]

for (let i = 0; i < 10; i++) {
    let art = artikel[Math.floor(Math.random() * artikel.length)];
    let adj = adjektive[Math.floor(Math.random() * adjektive.length)];

    if (!art.plural) {
        //singular
        switch(art.article){
            case "Der":
                console.log(art.article + " " + adj.concat("e") + " " + mSubstantive[Math.floor(Math.random() * mSubstantive.length)])
                break;
            case "Die":
                console.log(art.article + " " + adj.concat("e") + " " + fSubstantive[Math.floor(Math.random() * fSubstantive.length)])
                break;
            case "Das":
                console.log(art.article + " " + adj.concat("e") + " " + dSubstantive[Math.floor(Math.random() * dSubstantive.length)])
                break;
        }
    }
    else {
        console.log(art.article + " " + adj.concat("en") + " " +  pSubstantive[Math.floor(Math.random() * pSubstantive.length)])
    }
}