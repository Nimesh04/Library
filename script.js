const bookBtn = document.querySelector("#add-book");
const displayBook = document.querySelector("#display-book");
const saveBtn = document.querySelector("#save-btn");
const addBookBtn = document.querySelector("#add-book");
const container = document.querySelector(".container");
const bookDiv = document.querySelector("#bookDiv");




let myLibrary = [];

let addBookTrue = false;

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

    display(myLibrary[myLibrary.length - 1]);

}


addBookToLibrary("Meditations", "Marcus Arelius", 150, "Yes");

function closeWindow(){
    container.style.display = "none";
}


function display(element){
    const divAdd = document.createElement("div");
    divAdd.classList.add("tables");
    divAdd.setAttribute("data-id", element.uuid);
    divAdd.innerHTML = `
                        <p>Name:</p>
                        <p>${element.name}</p>
                        <p> Author:</p>
                        <p>${element.author}</p>
                        <p> Page: ${element.page}</p>
                        <p></p>
                        <p> Have Read: ${element.haveRead}</p>
                        <p></p>
                        <button data-id=${element.uuid} class="removeBtn">Remove</button>
                        <button class="toggleRead">Have Read</button>
                        `;
    displayBook.appendChild(divAdd);
}

function addToBook(event){
    let name = document.querySelector("#bookName").value;
    let author = document.querySelector("#authorName").value;
    let page = document.querySelector("#page").value;
    let haveRead = document.querySelector(".radioSection > input[name=haveRead]:checked").value;
    addBookToLibrary(name, author, page, haveRead);
    event.preventDefault();
    document.querySelector("#myForm").reset();  //resets the form's input value
    closeWindow();
}


saveBtn.addEventListener("click", addToBook, false);
addBookBtn.addEventListener("click", (event) =>{
    container.style.display = "flex";
    event.preventDefault();
})

container.addEventListener("click", event => {
    if(bookDiv.contains(event.target)) return;
    else closeWindow();
})

document.addEventListener("click", e => {
    if(e.target.classList.contains("removeBtn")){
        const parentDiv = e.target.closest(".tables");
        const id = parentDiv.getAttribute("data-id");
        console.log(myLibrary);
        parentDiv.remove();

        myLibrary = myLibrary.filter(item => item.uuid != id);

        console.log("After remove btn:", myLibrary);
    }
})

