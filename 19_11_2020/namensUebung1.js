/* Legt zwei Arrays an, einmal mit 10 Vornamen und einmal mit 5 Nachnamen.
Schreibt eine Funktion, die euch aus beiden Arrays einen zufälligen Namen sucht.
Legt für jede "Person" einen Array an, der Vor- und Nachname enthält.
Speichert euch insgesamt 5 Personen und überprüft, ob jemand den gleichen Nachnamen hat.
Wenn ja, soll ausgegen werden, dass diese beiden Personen verwandt sind.
Wenn alle Personen miteinander verwandt sind, soll etwas besonderes ausgegeben werden. */

const vornamen = ["Peter", "Tommy", "Rainer", "Bill", "Harvey", "Tom", "Jeff", "Julia", "Anette", "Elli"]
const nachnamen = ["Goll", "Schwartzmann", "Schwalbe", "Murray", "Meier"]
let personen = []
let _vorname
let _nachname
let counter

//Random vorname und nachname raussuchen und an die Fill array funktion weitergeben
function getName() {
    _vorname = vornamen[Math.floor(Math.random() * vornamen.length)]
    _nachname = nachnamen[Math.floor(Math.random() * nachnamen.length)]
    fillArray(_vorname, _nachname)
}

//Hier befüllen wir unser array mit den zuvor generierten namen
function fillArray(vorname, nachname) {
    personen[counter] = {
        firstName: vorname,
        lastName: nachname
    }
}
//Hier überprüfen wir ob es doppelte Nachnamen = geschwister gibt.
function checkForFamilies() {
    //In diesem array speichern wir die Nachnamen die bereits vorgekommen sind
    let seenLastnames = []
    //jede Familie bekommt ihr eigenes Array wo deren Vornamen gespeichert werden
    let familyArray = []

    for (let i = 0; i < personen.length; i++) {
        if (seenLastnames.includes(personen[i].lastName)) {
            // Wenn wir den nachnamen bereits gesehen haben liegt der Fall vor dass wir mindestens 1 geschwister teil haben
            familyArray[personen[i].lastName].push(personen[i].firstName) //Vorname ins Familen array hinzufügen
        }

        else {
            //Wir legen ein Family array an und fügen den Vornamen der momentanen Person hinzu
            familyArray[personen[i].lastName] = [personen[i].firstName]
            seenLastnames.push(personen[i].lastName)
        }

        if (familyArray[personen[i].lastName].length == 5) {
            //bei diesem seltenen Fall bekommen wir eine gesonderte Konsolenausgabe
            console.log("WOW WAS EIN ZUFALL! " + familyArray[personen[i].lastName][0] + ", " + familyArray[personen[i].lastName][1] + ", " + familyArray[personen[i].lastName][2] + ", " + familyArray[personen[i].lastName][3] + ", " + familyArray[personen[i].lastName][4] + "sind alle miteinander verwandt")
        }
        else if (familyArray[personen[i].lastName].length > 1) {
            //Wenn es Geschwister gibt fertigen wir hier unsere konsolen ausgabe
            let output = ""
            for (let l = 0; l < familyArray[personen[i].lastName].length; l++) {
                if (output == "") {
                    //bei dem ersten namen benötigen wir kein Und um die namen zu verbinden
                    output = familyArray[personen[i].lastName][l]
                }
                else {
                    output = output + " und " + familyArray[personen[i].lastName][l]
                }
            }
            console.log(output + " sind geschwister!")
        }

    }
}
//wieviele Namen wollen wir in unserem Array? sind auf 5 beschränkt bisland
for (counter = 0; counter < 5; counter++) {
    getName();
}
checkForFamilies();
//zur überprüfung geben wir einmal alle unsere Personen aus
console.log(personen)
