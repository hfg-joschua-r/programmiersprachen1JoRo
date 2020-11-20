const vornamen = ["Peter", "Tommy", "Rainer", "Bill", "Harvey", "Tom", "Jeff", "Julia", "Anette", "Elli"]
const nachnamen = ["Goll", "Schwartzmann", "Schwalbe", "Murray", "Meier"]

let person1 = []
let person2 = []
let person3 = []
let person4 = []
let person5 = []

let allePersonen = []

function getName(person) {
    person = [vornamen[Math.floor(Math.random() * vornamen.length)], nachnamen[Math.floor(Math.random() * nachnamen.length)]];
    return person;
}

person1 = getName(person1);
person2 = getName(person2);
person3 = getName(person3);
person4 = getName(person4);
person5 = getName(person5);

allePersonen = [person1, person2, person3, person4, person5]
console.log(allePersonen)

function checkRelatives() {
    for (let i = 0; i < allePersonen.length; i++) {
        // console.log(allePersonen[i][1])
        let currentNachname = allePersonen[i][1];
        let konsolenOutput = ""
        //let knownRelatives = []

        for (let j = 0; j < allePersonen.length; j++) {
            if (allePersonen[i] === allePersonen[j]) {
                //Hier ist ein vergleich mit dem eigenen Namen der Fall also brechen wir soll hier nichts passieren
            }
            else {
                if (currentNachname == allePersonen[j][1]) {
                    //die beide nachnamen sind gleich, d.h sie sind geschwister
                    if (konsolenOutput === "") {
                        //Wir sind am anfang unseres Satzes
                        konsolenOutput = allePersonen[i][0] + " " + currentNachname + " und " + allePersonen[j][0] + " " + allePersonen[j][1]
                    }
                    else {
                        //wir sind mittendrin
                        konsolenOutput = konsolenOutput + " und " + allePersonen[j][0] + " " + allePersonen[j][1]
                    }
                }
            }
        }
        if (konsolenOutput != "") {
            //wenn wir text zum Ausgben haben, gib ihn aus!
            //Problem: Geschwister werden doppelt ausgegeben. dh. person A ist mit person B verwandt, Person B ist mit Person A verwandt
            console.log(konsolenOutput + " sind geschwister!")
            console.log("-")
        }
    }
}

checkRelatives();
