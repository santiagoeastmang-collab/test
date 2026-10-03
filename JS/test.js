
/**
 * 
 * 
 */

console.log("Jellow");


let humanScore = 0;
let computerScore = 0;

let totalGames = 0


const humanChoice = getHumanChoice();
const computerChoice = getComputerChoice();


function getHumanChoice () {
    const selection = prompt("Select an option between: Rock - Paper - Scissors");
    const choice = selection.toLowerCase();

    if (choice == "rock") {
        return choice;
    } else if (choice == "paper") {
        return choice;
    } else if (choice == "scissors") {
        return choice;
    } else {
        alert("invalid selection")
        location.reload();
    }
    
}


function getComputerChoice () {
    // seleccion aleatoria

    const selection = Math.floor(Math.random() * 3) + 1;
    
    if (selection === 1) {
        return "rock";
    } else if (selection === 2) {
        return "paper";
    } else {
        return "scissors";
    }
    
}

console.log("computer: " + computerChoice);
console.log("human: " + humanChoice);

// playground logic
// get human and computer choices as arguments
// increment winner's and lods a winner announcement


function playground (humanChoice, computerChoice) {

    console.log("human: " + humanChoice + " vs " + "Computer: " + computerChoice);

    if (humanChoice === computerChoice) {
        return "it was a tie";
    } else if (humanChoice === "rock" && computerChoice === "scissors") {
        humanScore++
        // totalGames++
        return "rock beats scissors: human wins";
    } else if (humanChoice === "scissors" && computerChoice === "paper") {
        humanScore++
        // totalGames++
        return "scissors beats paper: human wins";
    } else if (humanChoice === "paper" && computerChoice === "rock") {
        humanScore++
        // totalGames++
        return "paper beats rock: human wins";
    } else {
        computerScore++
        // totalGames++
        return "computer wins";
    }

}


while (totalGames < 5) {

    // se pueden ejecutar variables adentro del loop solo al asignarlas como variables
    const humanChoice = getHumanChoice();
    const computerChoice = getComputerChoice();
    const result = playground(humanChoice, computerChoice);

    totalGames++
    console.log(result);
}

alert("total human: " + humanScore + " total computer: " + computerScore);

function add7(number) {
    return number + 7;
}

function multiply(num1, num2) {
    return num1 * num2
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    // return a => A + bcd;
}

// usar el length del argumento - 1 para obtener el ultimo 
function lastLetter(string) {
    return string[string.length - 1]
}

/**
 * Write a program that allows the user to enter a number, print each number between one and the number the user entered, but for numbers that divide by 3 without a remainder print Fizz instead. For numbers that divide by 5 without a remainder print Buzz and finally for numbers that divide by both 3 and 5 without a remainder print FizzBuzz.
 * 
 *
 * 
 * PSEUDOCODE:
 * When an user inputs a number
 * Loop from 1 to the given number
 * if given number is divisible by 3 then print Fizz
 * if given number is divisible by 5 then print Buzz
 * it given number is disivisible by 3 and 5 print fizzbuzz
 * otherwise print the given numner
*/

// parseInt to convert the answer into an integer (number)
// let answer = parseInt(prompt("Please enter a number you'd like to FizzBuzz up to: "));

// // para imprimir todos los numeros
// for (let index = 1; index <= answer; index++) { 
//     // primero evaluar si ambas condiciones se cumplen si esta al final ya no lo va a ejecutar      
//     if (index % 3 === 0 && index % 5 === 0) {
//         console.log("Fizz Buzz");
//     } else if (index % 3 === 0) {
//         console.log("Frizz");
//     } else if (index % 5 === 0) {
//         console.log("Buzz");
//     } else {
//         console.log(index);
//     }
// }

/**
 * 
 * 
*/

