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
        content.innerHTML = `
            <div>Title: ${Book.title}</div>
            <div>Author: ${Book.author}</div>
            <div>Pages: ${Book.pages}</div>
        `;
        //content.textContent = `${Book.title} ${Book.author} ${Book.pages}`;

        if (Book.read) {
            content.classList.add("read");
        }   else {
            content.classList.add("not-read");
        }

        const readButton = document.createElement("button");
        readButton.id = "toggleButton";
        readButton.classList.add("readButton");
        readButton.textContent = "Change Read Status";


        const deleteButton = document.createElement("button");
        deleteButton.classList.add("deleteButton");
        //deleteButton.textContent = "Delete";
        deleteButton.dataset.index = i;

        deleteButton.addEventListener("click", function() {
            const index = this.dataset.index;
            myLibrary.splice(index, 1);
            displayLibrary();
        });

        content.appendChild(readButton);
        content.appendChild(deleteButton);
        containerElement.appendChild(content);
    }
}

function toggleReadStatus(index) {
    const content = document.querySelectorAll(".content")[index];
    const book = myLibrary[index];

    if (book.read) {
        content.classList.remove("read");
        content.classList.add("not-read");
        book.read = false;
    }   else {
        content.classList.remove("not-read");
        content.classList.add("read");
        book.read = true;
    }
}

containerElement.addEventListener("click", function(event) {
    if (event.target.classList.contains("readButton")) {
        const index = Array.from(event.target.parentNode.parentNode.children).indexOf(event.target.parentNode);
        toggleReadStatus(index);
    }
});

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

