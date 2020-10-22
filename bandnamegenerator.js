//array mit adjektiven
//array mit substantiven
let adjektive = ["incredible ", "astonishing ", "super duper ", "sexy ", "depressed ", "frustrated ", "extreme ", "homeless ", "clumsy "];
let substantive = ["Tigers", "Pandas", "mirrors", "feathers", "programmers", "policewomen/men"]
//function: combine random adjektiv mit random substantiv

let randomBandname = (adj, sub) => console.log("The " + adj + sub);  

randomBandname(adjektive[Math.floor(Math.random() * adjektive.length)], substantive[Math.floor(Math.random()* substantive.length)]);
