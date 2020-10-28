const Der = { article: "Der", plural: false }
const Die = { article: "Die", plural: false }
const Das = { article: "Das", plural: false }
const DiePl = { article: "Die", plural: true }
//Array mit artikel Objekten
let artikel = [Der, Die, Das, DiePl]

//adjektive mit verschieden Steigerungen
let adjektive = [["groß", "größer", "größte"], ["gut", "besser", "beste"], ["schön", "schöner", "schönste"]]

let mSubstantive = ["Performer", "Reiter", "Knecht"]
let fSubstantive = ["Marmelade", "Kuh", "Schnecke"]
let dSubstantive = ["Quartett", "Gewitter", "Abendprogramm"]
let pSubstantive = ["Musketiere", "Programmierer", "Verlierer"]

//soll 10 mal ausgegeben werden 
for (let i = 0; i < 10; i++) {
    //Wählen von zufälligen Artikeln und Adjektiven mit Steigungen
    let art = artikel[Math.floor(Math.random() * artikel.length)];
    let adj = adjektive[Math.floor(Math.random() * adjektive.length)];
    adj = adj[Math.floor(Math.random() * adj.length)];

    //Überprüfung ob Adjektiv auf e endet ---> Wenn Ja? Dann werden zusätzliche Endungen obsolet
    if (adj.slice(-1) === "e") {
        if (!art.plural) {
            //Fall singular
            switch (art.article) {
                case "Der":
                    console.log(art.article + " " + adj + " " + mSubstantive[Math.floor(Math.random() * mSubstantive.length)])
                    break;
                case "Die":
                    console.log(art.article + " " + adj + " " + fSubstantive[Math.floor(Math.random() * fSubstantive.length)])
                    break;
                case "Das":
                    console.log(art.article + " " + adj + " " + dSubstantive[Math.floor(Math.random() * dSubstantive.length)])
                    break;
            }
        }
        else {
            //Fall Plural
            console.log(art.article + " " + adj + " " + pSubstantive[Math.floor(Math.random() * pSubstantive.length)])
        }
    }

    else {
        if (!art.plural) {
            //Fall singular
            switch (art.article) {
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
            //Fall plural
            console.log(art.article + " " + adj.concat("en") + " " + pSubstantive[Math.floor(Math.random() * pSubstantive.length)])
        }

    }
}