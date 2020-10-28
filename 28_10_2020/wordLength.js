let words = ["ansatz", "babarossa", "chicken", "cow", "haribobär"]
let aCounter = 0;
let bCounter = 0;
let cdCounter = 0;

for (let i = 0; i < words.length; i++) {
    console.log("The word " + words[i] + " consists of " + words[i].length + " letters")

    for (let j = 0; j < words[i].length; j++) {
        if (words[i][j] === "a") {
            aCounter++
        } else if (words[i][j] === "b") {
            bCounter++
        } else if (words[i][j] === "c" || words[i][j] === "d") {
            cdCounter++
        }
    }
    console.log("we got a total of " + aCounter + " a's. " + bCounter + " b's. " + cdCounter + " c's and d's in our Word " + words[i])
    aCounter = 0;
    bCounter = 0;
    cdCounter = 0;
}
