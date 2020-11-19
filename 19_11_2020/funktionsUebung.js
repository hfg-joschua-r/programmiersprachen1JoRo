/* Schreibt eine Funktion, die euch aus einem mit Zahlen zwischen 1 und 100 gefüllten Array eine Zahl heraussucht.
Danach überprüft, ob die Zahl größer ist als 49.
Wenn ja, soll direkt die Zahl ausgegeben werden.
Wenn nicht, soll die Zahl gespeichert und dann eine neue Zahl aus dem Array gesucht werden.
Danach sollen beide Zahlen mit einer Erklärung ausgegeben werden, warum es zwei Zahlen sind.
Das ganze soll 10 Mal ausgeführt werden. */
let numberArray = []
let smolNumber
let chosenNumber

function createArray() {
    for (var i = 1; i <= 100; i++) {
        numberArray.push(i)
    }
}

function chooseNumber() {
    chosenNumber = numberArray[Math.floor(Math.random() * numberArray.length)];
}

createArray();
for (let i = 0; i <= 10; i++) {
    chooseNumber();

    if (chosenNumber > 49) {
        console.log("Die zahl ist " + chosenNumber)
    }
    else {
        smolNumber = chosenNumber
        chooseNumber();
        console.log("Da " + smolNumber + " zu klein war, haben wir jetzt eine neue Zahl generiert und zwar: " + chosenNumber)
    }
}
