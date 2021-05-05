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
