const myLibrary = [];

class Book {
    constructor(name, author, pages, year, read) {
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.year = year;
        this.read = read;
    }
}

function addToMyLibrary() {
    const newBook = new Book("Nexus: A brief history of information networks",  "Yuval Noah Harari", 528, 2024, "not read yet");
}


console.log(addToMyLibrary);
