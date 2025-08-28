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

Book.prototype.read = function(){
    if((this.haveRead).toLowerCase() == "yes") this.haveRead = "No";
    else if((this.haveRead).toLowerCase() == "no") this.haveRead ="Yes";
    // console.log(this.haveRead);
}

function addBookToLibrary(name, author, page, haveRead){
    let uuid = crypto.randomUUID();

    const book = new Book(uuid, name, author, page, haveRead);

    myLibrary.push(book);

    display(myLibrary[myLibrary.length - 1]);

}

function closeWindow(){
    container.style.display = "none";
}


function display(element){
    const divAdd = document.createElement("div");
    divAdd.classList.add("tables");
    divAdd.setAttribute("data-id", element.uuid);
    divAdd.innerHTML = `
                        <h3>Name:</h3>
                        <p>${element.name}</p>
                        <h3> Author:</h3>
                        <p>${element.author}</p>
                        <p><strong>Page:</strong> ${element.page}</p>
                        <p></p>
                        <p class="read"><strong>Have Read:</strong> ${element.haveRead}</p>
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
        parentDiv.remove();

        myLibrary = myLibrary.filter(item => item.uuid != id);
    }

    if(e.target.classList.contains("toggleRead")){
        const parentDiv = e.target.closest(".tables");
        const id = parentDiv.getAttribute("data-id");
        const readPara = parentDiv.querySelector(".read");

        let book = myLibrary.filter(item => item.uuid == id)[0];
        book.read();
        readPara.innerHTML = `<p class="read"><strong>Have Read:</strong> ${book.haveRead}</p>`;

    }
})



addBookToLibrary("Meditations", "Marcus Aurelius", 172, "Yes");
addBookToLibrary("The Hard Thing About Hard Things", "Ben Horowitz", 304, "Yes");
