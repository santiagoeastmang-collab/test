class => template

plano casa = class
casas = objecto

## FOR

este es para buscar algo que necesito dentro del arreglo
se decide como empieza, cuando termina y cual es el siguiente paso

for (let index = 0; index < array.length; index++)
if (condicion)
else

por cada elemendo dentro del arreglo
donde index (puede ser cualquier nombre, pero como es un numero se define como indice) empieza en 0 que es la primera pocision del array

arreglo =  [cosa1, cosa2, cosa3, cosaN]
posicion = [0,     1,     2,     3    ] 

cuando index sea menor que el largo del arreglo
tomar index y agregarle 1 mas

primera iteracion
i es igual a 0 
i es menor que arreglo.length? -> SI
entonces 0 + 1 = 1

segunda iteracion
i es igual a 1
i es menor que arreglo.length? -> SI
entonces 1 + 1 = 2

asi hasta recorrer todo el arreglo

// i empieza en 0
// mientras i sea menor que el largo del arreglo que queramos recorrer en este caso 3
// suma 1 a i para volver a empezar
// y se termina hasta que i sea igual al largo del arreglo

// for (let i = 0; i < mokepones.length; i++) {
//     // entonces cuando el nombre elegido sea igual
//     // al que se encuentre durante el loop
//     // se va a cumplir la condicion
//     if (mokeponJugador === mokepones[i].name) {
//         // aca se le asigna ese valor a la variable que se definio al principio
//         attacks = mokepones[i].attacks;

//         objectoMokepon = mokepones[i]
//     }
// }



## FOR EACH
diferencia con FOR es que no hay una regla que rompa el ciclo 

aca por ejemplo le digo que por cada "elemento" dentro del arreglo necesito realizar una accion

en mokepon: por cada ataque, necesito imprimir en el html el button, entonces recorre el arreglo y va a imprimir un boton por cada elemento dentro del arreglo

for es, recorre todo el arreglo y cuando la condicion se cumpla termina la ejecicion y continua

arreglo.forEach((Elemento dentro del arreglo) => {}
^                       ^
el grupo de             El elemento que quiero
cosas que quiero        encontrar para asignarle
recorrer                la accion que quiero



## Functions vs Methods

functions that are part of objects are called methods

function draw() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT;
    for (let i = 0; i < 100; i++) {
        ctx.beginPath();
        ctx.fillStyle = "rgb(255 0 0 0 / 50%)";
        ctx.arc(random(WIDTH), random(HEIGHT), random(50), 0, 2 * Math.PI);
        ctx.fill();
    }
}

Return values are the values that a function returns when it completes

## Solving problmes 

- understanding the problem 
what the problem is -> write it down on paper, reword it until it makes sense and draw diagrams 

- Plan
don't jump into code yet
Does the program have an interface? how does it look like? what funcitonality have ...
What inputs the program has, user needs to enter data? get input from somewhere else?
what's the desire output?
what are the necessary steps to return the desire output? -> to write the algorithm (recipe for solving a particular problem) to solve the problem -> define the steps to solve it

- pseudocode
writing the logic for the program in natural language instead of code

divide into smaller pieces
don't try to solve all in one go

## Errors

Referenceerror: when one refers to a variable that is not declares and/or initialized within that scope

const a = "Jello"
const b = "Sup"

console.log(c) -> c is not defined

or can't access X before initialization

Stack trace -> this helps understand when the error was thrown and what functions are called


**syntax errors**
when the code is not written correctly 

**Reference error**
trying to reference something that does not exist

**type error**
operand or argument passed toa function is incompatible with the type expected
Or when attempting to modify a value that cannont be changed
Or when attempting to use a value in an inappropiate way

const string1 = "jello"
const string2 = "sup"

const message = string1.push(string2); 
                ^
                string1.push is not a function


## loops

streamline repeated instructions and dealing with large amount of data

to repeat a ser of instructions multiple times

**while**

while the condition is truthy te code from the loop is executed 

let i = 0   -> variable
while i < 3 -> condicion
    alert i -> imprime i en alerta
    i++     -> suma uno adicional a i

**do…while loop**

to execute the body at least once regardless of the condition being thruthy 

do {

} while (condition)

let i = 0   -> variable
do          -> se llama el do
    alert i -> se imprime en alerta
    i++     -> se agrega uno adicional
while i < 3 -> condicion

**for loop**

for (begin; condition; step)
    body

for (let i = 0; i <3; i++)
    alert i

run begin
    if condition -> run body and run step
    …


array = [8, empty × 2, 3, 2, 1]

keys treats empty slots as undefined while the for Each does not print them leavint "Empty"

array.forEach((item, index) => {
    console.log(`${index}: ${item}`)
});

OUTPUT
0: 1
1: 2
2: 3
5: 8

const iterator = array.keys();
for (let key of iterator) {
    console.log(`${key}: ${array[key]}`);
}

OUTPUT
0: 8
1: 7
2: undefined
3: 3
4: 2
5: 1


const string = "background-color";

string
    .split('-') -> ["background", "color"]
    
    .map((word, index)
    |-> recibe dos argumentos 
        word -> background
        index -> 0
        …
    
    => index == 0 ? word : word[0].toUpperCase() + word.slice(1))
    
    si index es 0 devuelve la palabra tal cual : background
    si index es diferente a 0 Capitaliza la primera letra y concatena el resto
    0 -> C, 1 -> olor
    
    .join('');
    junta las cadenas de nuevo para el resultado final
