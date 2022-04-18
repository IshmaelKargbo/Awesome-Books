const form = document.getElementById('form');
const books = document.getElementById('books');

let bookStore = [];

const refresh = () => {
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
        }
        bookCard.appendChild(remove);

        const borderB = document.createElement('hr');
        bookCard.appendChild(borderB);

        books.appendChild(bookCard);

        form.reset()
    })
}

const removeBook = (index) => {
    const temp = bookStore.filter((_, i) => i !== index);
    bookStore = temp;
    refresh()
}

form.onsubmit = (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.target).entries());

    bookStore.push(data);

    refresh();
}

