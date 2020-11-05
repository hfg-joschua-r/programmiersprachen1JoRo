/*Übung zu if-Abfragen:
Legt ein Array mit einer Liste von 10 Wörtern an, wählt ein zufälliges Wort, gebt das aus und "reagiert" auf das gewählte Wort,
 in dem ihr in einer if-Abfrage auf 5 der Wörter speziell reagiert und auf die anderen 5 mit einer "Standard"-Ausgabe. */

 const words = ["turmeric", "pepper", "salt", "curry", "chillipowder", "viking", "jacket", "browser", "batteries", "mirror"]
 let usedWords = []


for(let i = 0; i <= 10; i ++){
    let chosenWord = words[Math.floor(Math.random() * words.length)];

    if(usedWords.includes(chosenWord)){
        //Da wir ein neues Wort brauchen ziehen wir von i eins ab und beenden mit continue diesen "Durchlauf"
         i--;
         continue
     }
     else{
        usedWords.push(chosenWord);
        switch(chosenWord){
            case "turmeric":
                console.log(chosenWord +  " is a bright yellow aromatic powder obtained from the rhizome of a plant of the ginger family, used for flavouring and colouring in Asian cooking and formerly as a fabric dye.");
                break;
            case "pepper":
                console.log(chosenWord + " is a pungent hot-tasting powder prepared from dried and ground peppercorns, used as a spice or condiment to flavour food.")
                break;
            case "salt":
                console.log(chosenWord + " is a white crystalline substance that gives seawater its characteristic taste and is used for seasoning or preserving food.")
                break;
            case "curry":
                console.log(chosenWord + " is a mixture of finely ground spices, such as turmeric, ginger, and coriander, used for making curry.")
                break;
            case "chillipowder":
                console.log(chosenWord + " is a hot-tasting spice made from ground dried red chilli peppers, sometimes with other spices.")
                break;
            default:
                console.log(chosenWord + " is not a spice")
                break;
            }
     }
}