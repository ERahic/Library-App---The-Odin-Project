"use strict";

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
}

//capturing divs with querySelector
const form = document.querySelector(".form-container");

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
});
