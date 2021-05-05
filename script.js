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

// User Interface
function showAlert(message, className) {
  if (document.querySelector('.alert')) {
    document.querySelector('.alert').remove();
  }
  const div = document.createElement('div');
  div.className = `alert alert-${className}`;
  div.appendChild(document.createTextNode(message));
  const closeBtn = document.createElement('button');
  closeBtn.className = 'close-btn';
  closeBtn.textContent = 'X';
  div.appendChild(closeBtn);
  const container = document.querySelector('.form-container');
  const form = document.querySelector('form');
  container.insertBefore(div, form);

  closeBtn.addEventListener('click', () => {
    document.querySelector('.alert').remove();
  });
}

function removeBook(delButton) {
  books.splice(Number(delButton.getAttribute('data-attribute')), 1);
  localStorage.setItem('books', JSON.stringify(books));
  delButton.parentElement.parentElement.remove();
  showAlert('Book Removed', 'success');
}

function addBookToTable(book) {
  const tableBody = document.querySelector('#book-list');
  const row = document.createElement('tr');

  const statusField = document.createElement('td');
  statusField.setAttribute('id', `index${books.indexOf(book)}`);
  statusField.textContent = statusToString(book.status);

  const readBtn = document.createElement('button');
  readBtn.textContent = `${book.status ? 'Mark Unread' : 'Mark Read'}`;

  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove Book';
  removeBtn.setAttribute('data-attribute', getBooks().indexOf(book).toString());
  removeBtn.setAttribute('id', 'delete-btn');

  removeBtn.addEventListener('click', () => {
    removeBook(removeBtn);
  });

  readBtn.addEventListener('click', () => {
    toggleStatus(book);
    localStorage.setItem('books', JSON.stringify(books));
    statusField.textContent = statusToString(book.status);
    readBtn.textContent = `${book.status ? 'Mark Unread' : 'Mark Read'}`;
    showAlert('Read status updated', 'success');
  });

  const readTd = document.createElement('td');
  readTd.appendChild(readBtn);
  const removeTd = document.createElement('td');
  removeTd.appendChild(removeBtn);

  row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.pages}</td>
      <td>${book.isbn}</td>
    `;
  row.appendChild(statusField);
  row.appendChild(readTd);
  row.appendChild(removeTd);
  tableBody.appendChild(row);
}

function displayBooks() {
  books.forEach((book) => addBookToTable(book));
}

function clearFields() {
  document.querySelector('#title').value = '';
  document.querySelector('#author').value = '';
  document.querySelector('#pages').value = '';
  document.querySelector('#isbn').value = '';
  document.querySelector('#status').checked = false;
}

document.addEventListener('DOMContentLoaded', displayBooks);

document.querySelector('#book-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const pages = document.querySelector('#pages').value;
  const isbn = document.querySelector('#isbn').value;
  const status = document.querySelector('#status').checked;

  if (title === '' || author === '' || pages === '' || isbn === '') {
    showAlert('Please fill in all fields', 'danger');
  } else {
    const book = new Book(title, author, pages, isbn, status);
    addBookToTable(book);
    addBook(book);
    showAlert('Book Added', 'success');
    clearFields();
  }
});
