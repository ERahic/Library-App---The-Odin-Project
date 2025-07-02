"use strict";
//capturing divs with querySelector
const form = document.querySelector(".form-container");
const newBookForm = document.querySelector("#new-book-form");
const bookGrid = document.querySelector(".book-grid");

// Library array that will hold book objects created by the user
let myLibrary = [];

// Book constructor to create book objects
function Book(id, title, author, pages, read) {
  // Constructor
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// function to create books
function addBookToLibrary() {
  // take params, create a book and then store it in the array
  const id = crypto.randomUUID();
  const title = document.querySelector("#book_title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const read = document.querySelector('input[name="read"]:checked').value;

  // Create new book and push it to the my library array
  const newBook = new Book(id, title, author, pages, read);
  myLibrary.push(newBook);
  console.log("NEW BOOK ADDED: ", newBook);
  updateLibrary();
}

// funciton to loop through myLibrary array and generate new books on webpage
function updateLibrary() {
  // CLEAR THE BOOK GRID OF ANYTHING IN ORDER TO PREVENT DUPLICATION
  bookGrid.innerHTML = "";

  // Loop through the array and generate div's for each book found
  myLibrary.forEach((book) => {
    // Create new library card and book info div's to display on webpage
    const newLibraryCard = document.createElement("div");
    newLibraryCard.classList.add("library-card");
    const newBookInfo = document.createElement("div");
    newBookInfo.classList.add("book-info");
    newBookInfo.innerHTML = `<h2>${book.title}</h2> <h3>Author: ${book.author}</h3> 
    <h3>Pages: ${book.pages}</h3> <h3>Has Read? ${book.read}</h3>`;

    // If the user read the book, left border will be green, else, red
    if (book.read === "Yes") {
      newLibraryCard.style.borderLeft = "solid 1rem green";
    } else {
      newLibraryCard.style.borderLeft = "solid 1rem red";
    }

    // Btn to change the status of book read
    const readBtn = document.createElement("button");
    readBtn.innerText = "HAS READ?";
    readBtn.classList.add("delete-book-btn");
    readBtn.style.backgroundColor = "rgb(14, 165, 233)";
    readBtn.dataset.id = book.id;

    // When button is clicked, toggle the read status to either yes or no
    readBtn.addEventListener("click", function () {
      // match the readBtn's dataset with the book's id
      const hasReadToggle = this.dataset.id;
      // loop through each book in library array and check if the book id matches with the dataset of button
      myLibrary.forEach((book) => {
        if (book.id === hasReadToggle) {
          if (book.read === "Yes") {
            book.read = "No";
            newLibraryCard.style.borderLeft = "solid 1rem red";
          } else {
            book.read = "Yes";
            newLibraryCard.style.borderLeft = "solid 1rem green";
          }
        }
        // re-render the page to update the read status for book selected
        updateLibrary();
      });
    });

    // Btn to remove books that are on display
    const deleteBookBtn = document.createElement("button");
    deleteBookBtn.innerText = "DELETE BOOK";
    deleteBookBtn.classList.add("delete-book-btn");

    // Assigning book.id to delete button to set the data attribute
    deleteBookBtn.dataset.id = book.id;

    // Event listener to remove the book by matching the id of delete btn dataset
    deleteBookBtn.addEventListener("click", function () {
      const bookToDelete = this.dataset.id;
      myLibrary = myLibrary.filter((book) => book.id != bookToDelete);
      console.log("BOOK DELETED");
      console.log(bookToDelete);

      // Re-render to update the library array and display the remaining books or show none if only one book was created
      updateLibrary();
    });
    bookGrid.appendChild(newLibraryCard);
    newLibraryCard.appendChild(newBookInfo);
    newBookInfo.appendChild(readBtn);
    newBookInfo.appendChild(deleteBookBtn);
  });
}

// Btn to add new book via a form
const addBookBtn = document.querySelector(".new-book-btn");
addBookBtn.addEventListener("click", function () {
  console.log("NEW BOOK ADDED");
  form.classList.remove("hidden");
});

// Btn to cancel the form submition
const cancelFormBtn = document.querySelector(".cancel-btn");
cancelFormBtn.addEventListener("click", function () {
  console.log("FORM CANCEL CLICKED");
  form.classList.add("hidden");
  newBookForm.reset();
});

// Btn to submit the data entered by user
const submitFormBtn = document.querySelector(".submit-btn");
submitFormBtn.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("SUBMIT BUTTON CLICKED");
  form.classList.add("hidden");
  addBookToLibrary();
  newBookForm.reset();
});
