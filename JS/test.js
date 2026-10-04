
/**
 * 
 * 
 */

console.log("Jellow");

const buttonRock = document.getElementById('rock');
const buttonPaper = document.getElementById('paper');
const buttonScissors = document.getElementById('scissors');

const showHumanScore = document.getElementById('human-score');
const showComputerScore = document.getElementById('computer-score');
const results = document.getElementById('game-results');

const selectionHuman = document.createElement('h4');
const selectionComputer = document.createElement('h4');
const choiceName = document.createElement('p');
const gameResult = document.createElement('h5')

const showHumanChoice = document.getElementById('human-results');
const showComputerChoice = document.getElementById('computer-results');

let humanScore = 0;
let computerScore = 0;

let totalGames = 0



let humanChoice = "";
let computerChoice = "";

// function getHumanChoice() {
    buttonRock.addEventListener("click", function(event) {
        humanChoice = event.currentTarget.id
        console.log("clicked Rock!!!")
        showHumanChoice.textContent = humanChoice;
        
        getComputerChoice()

        showComputerChoice.textContent = computerChoice;

        playground (humanChoice, computerChoice)

        // showHumanScore.appendChild(selectionHuman)
        // selectionHuman.textContent = humanScore;

        // showComputerScore.appendChild(selectionComputer)
        // selectionComputer.textContent = computerScore;  

    })

    buttonPaper.addEventListener("click", function(event) {
        humanChoice = event.currentTarget.id
        console.log("clicked Paper!!!")
        showHumanChoice.textContent = humanChoice;
        // getHumanChoice(2);
        // console.log(humanChoice)
        getComputerChoice()

        showComputerChoice.textContent = computerChoice;

        playground (humanChoice, computerChoice)

        // showHumanScore.appendChild(selectionHuman)
        // selectionHuman.textContent = humanScore;

        // showComputerScore.appendChild(selectionComputer)
        // selectionComputer.textContent = computerScore;  

    })

    buttonScissors.addEventListener("click", function(event) {
        humanChoice = event.currentTarget.id
        console.log("clicked Scissors!!!")
        showHumanChoice.textContent = humanChoice;
        // getHumanChoice(3);
        // console.log(humanChoice)
        // getComputerChoice()

        showComputerChoice.textContent = computerChoice;

        playground (humanChoice, computerChoice)

        // showHumanScore.appendChild(selectionHuman)
        // selectionHuman.textContent = humanScore;

        // showComputerScore.appendChild(selectionComputer)
        // selectionComputer.textContent = computerScore;  

    })
// }


function getComputerChoice () {
    // seleccion aleatoria

    const selection = Math.floor(Math.random() * 3) + 1;
    
    if (selection === 1) {
       computerChoice = "rock";
    } else if (selection === 2) {
        computerChoice = "paper";
    } else {
        computerChoice = "scissors";
    }
    
}

// playground logic
// get human and computer choices as arguments
// increment winner's and lods a winner announcement


function playground (humanChoice, computerChoice) {

    console.log("human: " + humanChoice + " vs " + "Computer: " + computerChoice);
    if (humanChoice === computerChoice) {
        results.appendChild(gameResult)
        gameResult.textContent = "Was a tie!"
    } else if (humanChoice === "rock" && computerChoice === "scissors") {
        humanScore++
        totalGames++

        results.appendChild(gameResult)
        gameResult.textContent = "rock beats scissors: human wins"

    } else if (humanChoice === "scissors" && computerChoice === "paper") {
        humanScore++
        totalGames++

        results.appendChild(gameResult)
        gameResult.textContent = "scissors beats paper: human wins"

    } else if (humanChoice === "paper" && computerChoice === "rock") {
        humanScore++
        totalGames++

        results.appendChild(gameResult)
        gameResult.textContent = "paper beats rock: human wins"

    } else {
        computerScore++
        totalGames++

        results.appendChild(gameResult)
        gameResult.textContent = `${computerChoice} beats ${humanChoice}: computer wins`
        
    }

    gameSequence(totalGames);
}

function gameSequence(totalGames, humanChoice, computerChoice) {
    // const humanChoice = getHumanChoice();
    // getComputerChoice();

    if(totalGames < 5) {
        
        showHumanScore.appendChild(choiceName);
        choiceName.textContent = humanChoice;
        
        showComputerScore.appendChild(choiceName);
        choiceName.textContent = computerChoice;

        showHumanScore.appendChild(selectionHuman)
        selectionHuman.textContent = humanScore;

        showComputerScore.appendChild(selectionComputer)
        selectionComputer.textContent = computerScore;  

        totalGames++
    } else {
        buttonRock.disabled = true;
        buttonPaper.disabled = true;
        buttonScissors.disabled = true;
        
        alert(`Human won: ${humanScore} times & Computer won: ${computerScore}`)
        return location.reload()
    }
}


// alert("total human: " + humanScore + " total computer: " + computerScore);

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

