// create three variables that hold reference to the list

const itemsList = document.querySelector("ul");
const inputList = document.querySelector("input");
const addButtonItem = document.querySelector("button");


// create a function that will run in response to the button being clicked

addButtonItem.addEventListener("click", (event) => {
    // prevent the default behavior of submiting the form
    event.preventDefault();
    
    // storing el valor del input
    const newItem = inputList.value;
    inputList.value = "";

    const listItem = document.createElement("li");
    const listText = document.createElement("span");
    const deleteItem = document.createElement("button");
    
    listItem.appendChild(listText);
    listText.textContent = newItem

    listItem.appendChild(deleteItem);
    deleteItem.textContent = "Delete"
    
    itemsList.appendChild(listItem);

    // parentNode.removeChild(child)
    console.log(`Item added: ${newItem}`)
    console.log(itemsList);

    deleteItem.addEventListener("click", function(){
        itemsList.removeChild(listItem);
    })

    inputList.focus();
})
