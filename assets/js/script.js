import AwesomeBooks from './awsome-book.js';

const awesome = new AwesomeBooks();

const form = document.getElementById('form');
const books = document.getElementById('books');
const shelf = document.getElementById('shelf');

function renderBooks() {
  shelf.innerHTML = '';
  books.innerHTML = '';

  if (awesome.shelf().length === 0) {
    const no = document.createElement('p');
    no.classList.add('empty');
    no.innerHTML = 'Empty Shelf<br >Please add you books';
    shelf.appendChild(no);
  }

  awesome.shelf().forEach((e, i) => {
    const bookCard = document.createElement('li');

    if (i % 2 === 1) bookCard.classList.add('draf');

    const details = document.createElement('p');
    details.innerText = `"${e.title}" by ${e.author}`;

    bookCard.appendChild(details);

    const remove = document.createElement('button');
    remove.type = 'button';
    remove.innerText = 'Remove';
    remove.onclick = () => {
      awesome.removeBook(e.id);
      renderBooks();
    };
    bookCard.appendChild(remove);

    books.appendChild(bookCard);

    form.reset();
  });

  shelf.appendChild(books);
}

renderBooks();

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const book = Object.fromEntries(new FormData(e.target).entries());
  awesome.addBook(book.title, book.author);
  renderBooks();
});
