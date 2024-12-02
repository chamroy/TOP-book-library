const newBookBtn = document.getElementById("newBookBtn");
const bookDialog = document.getElementById("bookDialog");

newBookBtn.addEventListener("click", () => {
  bookDialog.showModal();
});

const myLibrary = [];
function Book(title, author, pages, hasRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

function addBookToLibrary(title, author, pages, hasRead) {
  const newBook = new Book(title, author, pages, hasRead);
  myLibrary.push(newBook);
  displayBooks();
}

function displayBooks(book, index) {
  const container = document.getElementById("libraryContainer");
  container.innerHTML = "";

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.setAttribute("data-index", index);

    bookCard.innerHTML = `
    <h3>${book.title}</h3>
    <p>by ${book.author}</p>
    <p>${book.pages} pages</p>
    <p class="${book.read ? "read" : "unread"}">
        ${book.read ? "Read" : "Not read yet"}
    </p>
    <div class="book-actions">
        <button class="toggle-read-btn" onclick="toggleReadStatus(${index})">
            Toggle Read
        </button>
        <button class="delete-btn" onclick="removeBook(${index})">
            Delete
        </button>
    </div>
`;
    container.appendChild(bookCard);
  });
}

function removeBook(index) {
  myLibrary.splice(index, 1);
  displayBooks();
}

function toggleReadStatus(index) {
  myLibrary[index].toggleRead();
  displayBooks();
}

// Dialog handling
const dialog = document.getElementById("bookDialog");
const showButton = document.getElementById("newBookBtn");
const form = document.getElementById("bookForm");

showButton.addEventListener("click", () => {
  dialog.showModal();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = parseInt(document.getElementById("pages").value);
  const read = document.getElementById("read").checked;

  addBookToLibrary(title, author, pages, read);

  form.reset();
  dialog.close();
});

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary("The Catcher in the Rye", "J.D. Salinger", 277, false);
