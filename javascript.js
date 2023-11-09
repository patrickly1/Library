const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    const StoredBook = new Book(title, author, pages, read);
    myLibrary.push(StoredBook);
}

const containerElement = document.querySelector("#container");

function displayLibrary() {
    containerElement.innerHTML = "";

    for (let i = 0; i < myLibrary.length; i++) {
        const Book = myLibrary[i];
        
        const content = document.createElement("div");
        content.classList.add("content");
        content.textContent = `${Book.title} ${Book.author} ${Book.pages}`;

        const readButton = document.createElement("button");
        readButton.id = "toggleButton";
        readButton.classList.add("readButton");


        const deleteButton = document.createElement("button");
        deleteButton.classList.add("deleteButton");
        deleteButton.textContent = "Delete";
        deleteButton.dataset.index = i;

        deleteButton.addEventListener("click", function() {
            const index = this.dataset.index;
            myLibrary.splice(index, 1);
            displayLibrary();
        });

        content.appendChild(deleteButton);
        content.appendChild(readButton);
        containerElement.appendChild(content);
    }
}

const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("#close")

// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
  dialog.showModal();
});

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  dialog.close();
});

// Get info about the book when I click "Add book!" button
document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked;

    addBookToLibrary(title, author, pages, read);
    displayLibrary();
    dialog.close();

    document.getElementById("form").reset();
})

//addBookToLibrary("Harry Potter", "J.K Rowling", 500, true);
//displayLibrary();

