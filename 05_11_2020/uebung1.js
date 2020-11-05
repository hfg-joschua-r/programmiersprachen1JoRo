/*Augabe Lege zwei Arrays mit jeweils 10 verschiedenen Wörtern an.
Schreibe ein Programm, das aus jedem Array ein zufälliges Wort auswählt und die beiden Wörter aneinanderhängt.
Das generierte Passwort soll am Ende mit einer Erklärung (z. B. "Das Passwort lautet ") ausgegeben werden. */

//Anlegen von zwei Arrays mit jeweils 10 verschiedenen Wörtern
const words1 = ["Hase", "Orangensaft", "Brille", "Lampe", "Tiger", "Schreibtisch", "Schubladen", "Kabel", "Motor", "Rasen"]
const words2 = ["auto", "default", "text", "playlist", "codein", "fahrrad", "Roller", "Stadtmitte", "Professor", "Figur"]
let password = "1"

let characters =["$", "§", "?", "*", "!", "(:"]
//Das ist die funktion um die zwei zufällig gewählten wörter zu verbinden und dann in der Konsole ausgeben. Die Funktion erwartet 2 parameter: word1 und word2.
let generatePassword = (word1, word2, count) => {
    let random = Math.random()
    
    if(random < 0.5){
        password = word1 + word2
        if(password.length < 15){
            password = password + words1[Math.floor(Math.random() * words1.length)]
        }
        addFactorToPassword();
        console.log("Das " + count + "te Passwort lautet: " + password)
    }
    else{
        password = word2 + word1
        if(password.length < 15){
            password = password + words1[Math.floor(Math.random() * words1.length)]
        }
        addFactorToPassword();
        console.log("Das " + count + "te Passwort lautet: " + password)
    }
   
}
//Wir modulasieren diese Funktion um die Leserlichkeit/Übersicht zu behalten
function addFactorToPassword()
{
    //wir ersetzen jedes a im Passwort mit einem X
    password = password.replace("a", "X")
    //Wenn das passwort länger oder gleich 18 zeichen besitzt fügen wir ein #1312 am ende hinzu 
    if(password.length >= 18){
        password = password.concat("#1312")
    }
    //Wenn das passwort länger oder gleich 17 ist fügen wir ein sonderzeichen am ende hinzu
    else if(password.length >= 17){
        password = password.concat(characters[Math.floor(Math.random() * characters.length)])
    }
    //wenn das Passwort mit einem F oder f beginnt Fügen wir ein sonderzeichen hinzu
    if(password.substr(0, 1) === "f" || password.substr(0, 1) === "F"){
        password = characters[Math.floor(Math.random() * characters.length)] + password
    }
}

//Hier wird die oben beschrieben Funktion aufgerufen. Die zufälligen Wörter werden der Funktion direkt übergeben, um weniger Code zu haben. 
//Das i am Ende signalisiert der Funktion das wievielte Passwort generiert werden soll.
for (let i = 1; i <= 10; i++) {
    generatePassword(words1[Math.floor(Math.random() * words1.length)], words2[Math.floor(Math.random() * words2.length)], i)
}