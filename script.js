const bookBtn = document.querySelector("#add-book");
const displayBook = document.querySelector("#display-book");


const myLibrary = [];

function Book(uuid, name, author, page, haveRead){
    this.uuid = uuid;
    this.name = name,
    this.author = author,
    this.page = page,
    this.haveRead = haveRead,
    this.fullDes = function(){
        return `${this.name} written by ${this.author} has ${this.page} pages. Read: ${this.haveRead}`;
    }
}

function addBookToLibrary(name, author, page, haveRead){
    let uuid = crypto.randomUUID();

    const book = new Book(uuid, name, author, page, haveRead);

    myLibrary.push(book);
}


addBookToLibrary("Helo", "Joshep", 289, true);
addBookToLibrary("Hamu", "marget", 25, false);
addBookToLibrary("Hamu", "marget", 25, false);



myLibrary.pop();

function display(element){
    const divAdd = document.createElement("div");
    divAdd.classList.add("tables");
    divAdd.innerHTML = `<p>Name: ${element.name}</p>
                            <p> Author: ${element.author}</p>
                            <p> Page: ${element.page}</p>
                            <p> Have Read: ${element.haveRead}</p>`;

    displayBook.appendChild(divAdd);
}

myLibrary.forEach(element => {
    display(element);
})
