// obtener con id selector
const container = document.querySelector("#container");
const display = container.lastElementChild;

console.log(display)

// obtener con class selector
const controls = document.querySelector(".contorls");
const displayControls = controls.previousElementSibling;

console.log(displayControls);

// crear y agregar un nuevo elemento
const newContent = document.createElement("div");

// parent = container
// child = newContent
// parentNode.appendChild(childNode)
container.appendChild(newContent);

newContent.classList.add("new")
newContent.style.backgroundColor = "honeydew";
newContent.textContent = "C";

/**
 * a <p> with red text that says “Hey I’m red!” √
 * an <h3> with blue text that says “I’m a blue h3!” √
 * a <div> with a black border and pink background color with the following elements inside of it:
 * another <h1> that says “I’m in a div”
 * a <p> that says “ME TOO!”
 * 
 * Hint for this one: after creating the <div> with createElement, append the <h1> and <p> to it before adding it to the container.
 */

const newParragrahp = document.createElement("p");

container.appendChild(newParragrahp);
newParragrahp.setAttribute("style", "color: red;");
newParragrahp.textContent = "Hey I'm red!"

const newTitle = document.createElement("h3");

container.appendChild(newTitle);
newTitle.setAttribute("style", "color: blue;");
newTitle.textContent = "Hey I'm a blue h3!"

const newSection = document.createElement("div");
newSection.setAttribute("style", "border: 1px black; background-color: pink");

container.appendChild(newSection);

const newSectionTitle = document.createElement("h3");
newSection.appendChild(newSectionTitle);

newSectionTitle.textContent = "I'm in a div!"

const newSectionDescription = document.createElement("p");
newSection.appendChild(newSectionDescription);

newSectionDescription.textContent = "ME TOO!"


const buttons = document.querySelectorAll("button");


// con onclick function
// button.onclick = () => alert('hello');

// con eventlistener

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        alert(button.id);
    });
})