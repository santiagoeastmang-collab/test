let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let styles = ['Jazz', 'Blues', 'Grunge', 'Rock', 'Disco', 'Rock-n-Roll'];


// asigna el resultado a la variable


let filtered = filterRange(array, 4, 8);
// .filter((number) => number % 2 ===0) // filtra el array a solo pares 
// number % 2 !== 0;
function filterRange(array, a, b) {
    // return array.filter((number) => number >= a && number <= b)
    for (let number = 0; number < array.length; number++) {
        if(array[number] >= a && array[number] <= b) {

            console.log(array[number])
        }
    }
}

console.log(`Original: ${array}`);
console.log("filtered: " + filtered)
/**
 * We need to perform an operation only on the even numbers.
 * We need to transform those numbers by multiplying them by 3.
 * Finally, we need to add the result up from the previous transformation.
 */



function sumOfTripledEvens(array) {
    let sum = 0;

    for (let i = 0; i < array.length; i++) {
        
        // checkea si el numero es par 4 % 2 === 0, 6 % 2 === 0 
        if (array[i] % 2 === 0) {
            console.log(i);
            // toma el numero anterior y los multiplica * 3
            const tripleEvenNumber = array[i] * 3;

            console.log(`even: ${array[i]} x 3 = ${tripleEvenNumber}`);

            // suma los numeros
            sum += tripleEvenNumber;
        }   
    }

    return sum;
}

function sumOfTripledEvensOptimized(array) {

    return array
        .filter((number) => number % 2 ===0) // filtra el array a solo pares 
        .map((number) => number * 3) // multiplica cada valor * 3
        .reduce((actual, current) => actual + current);

}

/**
 * MAP method
 * expects a callback as argument -> I want you to pass another function as 
 * an argument to my function
 * 
 * Map return a new array and does not change the original array
 * 
 * Map -> elegant way than writing a for loop …
 */

// Array
// const arr = [1, 2, 3, 4, 5,6];

// asigna el resultado de la funcion a la variable
// usando funcion declarada en otro lugar
const mappedArr = array.map(addOne);

// usando arrow function
const mappedArr2 = array.map((number) => number + 1);
                        // ^
                        // elemento en el array
// imprime el resultado
// console.log(`Mapped with function: ${mappedArr}`);
// console.log(`Mapped with => function: ${mappedArr2}`);
// console.log(`Original: ${array}`);

// se declara la funcion que va como argumento de map(ARGUMENTO)

// can be skipped as we're not using addOne anywhere else
function addOne(number) {
    return number +1;
}


/**
 * FILTER method
 * similar to map. instead of trnasforming the values in the array
 * returnes a new array where each item is only included if the callback 
 * function returns TRUE for it
 * 
 */

// asigna el resultado a la variable
const oddNumber = array.filter(isOdd);
// console.log(`Odd numbers: ${oddNumber}`);

// console.log(`Original: ${array}`);

function isOdd(number) {
    return number % 2 !== 0;
}

// asigna el resultado a la variable
const evenNumber = array.filter(isEven);
// console.log(`Even numbers: ${evenNumber}`);

// console.log(`Original: ${array}`);

function isEven(number) {
    return number % 2 == 0;
}



/**
 * REDUCE method
 * 
 * expectes a callback function like .map() and .filter()
 * BUT takes two arguments instead of one
 * 
 * first -> accumulator: the current value of the result at that point int he loop
 * 
 * second ->initialValue as an optional argument: helps when we don't want our initial value to be the first element in the array
 */



