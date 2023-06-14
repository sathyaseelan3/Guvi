const booksUrl = 'https://www.anapioficeandfire.com/api/books?page=1&pageSize=10';
const charactersUrl = 'https://www.anapioficeandfire.com/api/characters/';

async function init() {
  try {
    const response = await fetch(booksUrl);
    const books = await response.json();
    displayBooks(books);
  } catch (error) {
    console.error(error);
  }
}

async function displayBooks(books) {
  const booksDiv = document.getElementById('books');
  const searchInput = document.getElementById('search');

  searchInput.addEventListener('input', () => {
    const searchQuery = searchInput.value.toLowerCase();
    const filteredBooks = filterBooks(books, searchQuery);
    renderBooks(filteredBooks);
  });

  renderBooks(books);

  async function renderBooks(books) {
    booksDiv.innerHTML = '';

    for (const book of books) {
      const bookDiv = document.createElement('div');
      bookDiv.classList.add('book');

      const title = document.createElement('h2');
      title.innerHTML = highlightText(book.name, searchInput.value);
      bookDiv.appendChild(title);

      const isbn = document.createElement('p');
      isbn.innerText = `ISBN: ${book.isbn}`;
      bookDiv.appendChild(isbn);

      const pages = document.createElement('p');
      pages.innerText = `Number of Pages: ${book.numberOfPages}`;
      bookDiv.appendChild(pages);

      const authors = document.createElement('p');
      authors.innerText = `Authors: ${book.authors.join(', ')}`;
      bookDiv.appendChild(authors);

      const publisher = document.createElement('p');
      publisher.innerText = `Publisher: ${book.publisher}`;
      bookDiv.appendChild(publisher);

      const released = document.createElement('p');
      released.innerText = `Released Date: ${book.released}`;
      bookDiv.appendChild(released);

      const characters = document.createElement('p');
      const characterNames = await getCharacterNames(book.characters);
      characters.innerHTML = `Characters: ${characterNames}`;
      bookDiv.appendChild(characters);

      booksDiv.appendChild(bookDiv);
    }
  }
}

function filterBooks(books, searchQuery) {
  return books.filter(book => {
    const lowercaseName = book.name.toLowerCase();
    return lowercaseName.includes(searchQuery);
  });
}

function highlightText(text, query) {
  if (!query) {
    return text;
  }

  const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
  return text.replace(regex, '<span class="highlight">$1</span>');
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function getCharacterNames(characterUrls) {
  const characterNames = [];

  for (let i = 0; i < Math.min(5, characterUrls.length); i++) {
    const characterUrl = characterUrls[i];
    const response = await fetch(characterUrl);
    const character = await response.json();
    characterNames.push(character.name);
  }

  return characterNames.join(', ');
}

init();
