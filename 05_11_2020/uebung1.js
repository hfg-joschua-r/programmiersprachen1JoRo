/*Augabe Lege zwei Arrays mit jeweils 10 verschiedenen Wörtern an.
Schreibe ein Programm, das aus jedem Array ein zufälliges Wort auswählt und die beiden Wörter aneinanderhängt.
Das generierte Passwort soll am Ende mit einer Erklärung (z. B. "Das Passwort lautet ") ausgegeben werden. */

//Anlegen von zwei Arrays mit jeweils 10 verschiedenen Wörtern
const words1 = ["Hase", "Orangensaft", "Brille", "Lampe", "Tiger", "Schreibtisch", "Schubladen", "Kabel", "Motor", "Rasen"]
const words2 = ["auto", "default", "text", "playlist", "codein", "fahrrad", "Roller", "Stadtmitte", "Professor", "Figur"]

//Das ist die funktion um die zwei zufällig gewählten wörter zu verbinden und dann in der Konsole ausgeben. Die Funktion erwartet 2 parameter: word1 und word2.
let generatePassword = (word1, word2, count) => {
    console.log("Das " + count + "te Passwort lautet: " + word1 + word2)
}

//Hier wird die oben beschrieben Funktion aufgerufen. Die zufälligen Wörter werden der Funktion direkt übergeben, um weniger Code zu haben. 
//Das i am Ende signalisiert der Funktion das wievielte Passwort generiert werden soll.
for (let i = 1; i <= 10; i++) {
    generatePassword(words1[Math.floor(Math.random() * words1.length)], words2[Math.floor(Math.random() * words2.length)], i)
}