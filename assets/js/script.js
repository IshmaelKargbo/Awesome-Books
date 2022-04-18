const form = document.getElementById('form');
const books = document.getElementById('books');

function fetchBooks() {
  const data = localStorage.getItem('awssome_books');
  return JSON.parse(data) || [];
}

let bookStore = fetchBooks();

function saveBook(book) {
  bookStore.push(book);
  localStorage.setItem('awssome_books', JSON.stringify(bookStore));
}

function removeBook(index) {
  const temp = bookStore.filter((_, i) => i !== index);
  bookStore = temp;
}

function renderBooks() {
  books.innerHTML = '';

  bookStore.forEach((e, i) => {
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
      removeBook(i);
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

  saveBook(book);
  renderBooks();
});