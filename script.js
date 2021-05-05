function Book(title, author, pages, isbn, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isbn = isbn;
  this.status = status;
}

function toggleStatus(book) {
  book.status = !book.status;
}

// Storage
function getBooks() {
  let books;
  if (localStorage.getItem('books') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }
  return books;
}

const books = getBooks();

function addBook(book) {
  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));
}

function statusToString(status) {
  if (status) {
    return 'Read';
  }
  return 'Unread';
}
