import AwesomeBooks from './awsome-book.js';

const awesome = new AwesomeBooks();

const form = document.getElementById('form');
const books = document.getElementById('books');

function renderBooks() {
  books.innerHTML = '';

  awesome.shelf().forEach((e) => {
    const bookCard = document.createElement('div');

    const title = document.createElement('p');
    title.innerText = e.title;
    bookCard.appendChild(title);

    const author = document.createElement('p');
    author.innerText = e.author;
    bookCard.appendChild(author);

    const remove = document.createElement('button');
    remove.type = 'button';
    remove.innerText = 'Remove';
    remove.onclick = () => {
      awesome.removeBook(e.id);
      renderBooks();
    };
    bookCard.appendChild(remove);

    const borderB = document.createElement('hr');
    bookCard.appendChild(borderB);

    books.appendChild(bookCard);

    form.reset();
  });
}

renderBooks();

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const book = Object.fromEntries(new FormData(e.target).entries());
  awesome.addBook(book.title, book.author);
  renderBooks();
});