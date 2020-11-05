/* Ihr könnt nebenher an dieser Aufgabe knoblen (wie vorher angesprochen ist die ein bisschen komplizierter wegen Helper-Funktionen bzw. verschachtelten Schleifen):
"Lege ein Array mit 10 verschiedenen Wörtern an, die nacheinander zufällig ausgewählt und ausgegeben werden sollen.
Jedes Wort darf nur einmal ausgegeben werden." */

const words = ["Hase", "Orangensaft", "Brille", "Lampe", "Tiger", "Schreibtisch", "Schubladen", "Kabel", "Motor", "Rasen"]
let usedWords = []

//choose random word
for(let i = 1; i <= words.length; i ++){

    let chosenWord = words[Math.floor(Math.random() * words.length)]
    if(usedWords.includes(chosenWord)){ continue }
    else{
        console.log("Das " + i + "te Wort ist " + chosenWord)
        usedWords.push(chosenWord);
    }
}