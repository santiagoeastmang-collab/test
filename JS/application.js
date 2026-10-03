// objects, storing related information with key/value paiers. (json-ish)

const myObject = {
    property: "Santiago!",
    otherProperty: 34,
    "property with function": function() {
        // This is a function inside an object
    }
};

// getting information from an object

console.log(myObject.property);

// it won't work 
console.log(myObject["property with function"]);

// objects
const playerOne = {
    name: "john",
    marker: "X",
};

const playerTwo = {
    name: "Peter",
    marker: "O"
}

// grouping data together into objects allows to pass all data around
function gameOver(winningPlayer) {
    console.log("Congrats!");
    console.log(`${winningPlayer.name} (${winningPlayer.marker} is the winner`);
    
}

/*
    objects as design pattern
    for organizing functionallity as well not only data
    contain data: form of fields - attributes or properties
            code: procedures - methods (functions that are part of an object)

    What properties (physical or conceptual) does my thing have?
    How can I interact with it?    
*/

// Object 
const car = {
    maker: "Volkswagen",
    model: "Golf",
    year: 2026,
    color: "Space gray",
    priceEUR: 25000,
    
    // methods to apply something - discount to the car
    // a method is just a function assigned to a property 
    
    applyDiscount: function (discountPercentage) {
        const multiplier = 1 - discountPercentage / 100;
        this.priceEUR *= multiplier;
    },
    
    // shorthand way to add a method to an object 

    // this - referes to the object they get called from "this car"
    getSummary() {
        return `${this.year} ${this.maker} ${this.model} in ${this.color}, priced at ${this.priceEUR}€.`;
    },
};

// also try to describe something more abstract like a game as an object

const rockPaperScissors = {
    playerScore: 0,
    computerScore: 0,

    playerRound(playerChoice) {
        // code to play the roun,
        // update score
        // return the result
    },

    getWinningPlayer() {

    },

    reset() {

    }
}

rockPaperScissors.playerRound("Rock"); 
console.log(rockPaperScissors.playerScore);

/**
 * private properties with _someProperty
 * for internal use and not meant to be read or called outside of the object
 */

/**
 * properties: 
 * list of itemes you've collected and max number of items you can carry
 * list of cuntions 
 * DOM elements for the buttons for interaction and elements displaying data
 */

/** 
 * Methods: 
 * make the machine DO specific thins
 * remove items from a list and add new
 * fire all the functions that are listening to an event
 * read data from somewhere else
 */


// Constructors

/**
 * duplicates/instances of objects as a based to create new ones/inheritance
 * 
 * typing out the contents of ll of our objects is not always feasible
 * 
 * for specific type that you need to make multiple, a better way is using an object constructor - just a function
 */

function Player(name, marker) {
    // you can cal the constructor without new and create hart to track errors
    // so a conditional can be defined to use the - new
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");  
    }
    
    this.name = name;
    this.marker = marker;
    // asign a functio to a property inside the object
    this.sayName = function() {
        console.log(this.name);
        
    }
}

// variable    new element on the object (name, marker)
const player1 = new Player("Steve", "X");
const player2 = new Player("Alsto steve", "O");

console.log(player1.name); // Steve

// calling that function 
player2.sayName();

