/* Ihr könnt nebenher an dieser Aufgabe knoblen (wie vorher angesprochen ist die ein bisschen komplizierter wegen Helper-Funktionen bzw. verschachtelten Schleifen):
"Lege ein Array mit 10 verschiedenen Wörtern an, die nacheinander zufällig ausgewählt und ausgegeben werden sollen.
Jedes Wort darf nur einmal ausgegeben werden." */

//array mit random wörtern
const words = ["Hase", "Orangensaft", "Brille", "Lampe", "Tiger", "Schreibtisch", "Schubladen", "Kabel", "Motor", "Rasen"]
//leeres array in der später bereits verwendete Wörter gespeichert werden
let usedWords = []

//10 wörter random ausgeben
for(let i = 1; i <= words.length; i ++){
    //Hier wird ein random Wort ausgewählt
    let chosenWord = words[Math.floor(Math.random() * words.length)]
    //wenn das Wort bereits verwendet wurde (es sich im usedWords array befindet):
    if(usedWords.includes(chosenWord)){
        //Da wir ein neues Wort brauchen ziehen wir von i eins ab und beenden mit continue diesen "Durchlauf"
         i--;
         continue
     }
    else{
        //Wenn das wort noch nicht in unserem Array existiert gib es in der Konsole aus. 
        console.log("Das " + i + "te Wort ist " + chosenWord)
        //Und füge es zu unserem usedWords array hinzu
        usedWords.push(chosenWord);
    }
}