"use strict";
//capturing divs with querySelector
const form = document.querySelector(".form-container");
const newBookForm = document.querySelector("#new-book-form");
const bookGrid = document.querySelector(".book-grid");

// Library array that will hold book objects created by the user
const myLibrary = [];

// Book constructor to create book objects
function Book(title, author, pages, read) {
  // Constructor
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// function to create books
function addBookToLibrary() {
  // take params, create a book and then store it in the array
  const title = document.querySelector("#book_title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const read = document.querySelector('input[name="read"]:checked').value;
  // Create new book and push it to the my library array
  const newBook = new Book(title, author, pages, read);
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
    <h3>Pages: ${book.pages}</h3> <h3>Has Read? ${book.read}</h3> 
    <button type="button" class="delete-book-btn">DELETE BOOK</button>`;
    // If the user read the book, left border will be green, else, red
    if (book.read === "Yes") {
      newLibraryCard.style.borderLeft = "solid 1rem green";
    } else {
      newLibraryCard.style.borderLeft = "solid 1rem red";
    }
    bookGrid.appendChild(newLibraryCard);
    newLibraryCard.appendChild(newBookInfo);
  });
}

// Btn to add new book via a form
const addBookBtn = document.querySelector(".new-book-btn");
addBookBtn.addEventListener("click", function () {
  console.log("NEW BOOK ADDED");
  form.classList.remove("hidden");
});

// Btn to remove books that are on display
const deleteBookBtn = document.querySelector(".delete-book-btn");
deleteBookBtn.addEventListener("click", function () {
  console.log("BOOK DELETED");
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
