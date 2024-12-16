const openBookModal = document.querySelector('#open-book-modal');
const darkmodeToggle = document.querySelector('#darkmode-toggle');
const darkmodeIcon = document.querySelector('#darkmode-icon');
const body = document.querySelector('body');
const modal = document.querySelector('#modal');
const closeBookModal = document.querySelector('#book-form-close');
const cardContainer = document.querySelector('.booklist-wrapper');

/* Book form nodes*/
const bookForm = document.querySelector('#book-form');
const bookTitle = document.querySelector('#book-form-title');
const bookAuthor = document.querySelector('#book-form-author');
const bookPages = document.querySelector('#book-form-pages');
const bookDescription = document.querySelector('#book-form-description');
const bookRating = document.querySelectorAll('.book-rating');
const bookRead = document.querySelector('#book-form-read');
const bookSubmit = document.querySelector('#book-form-submit');
const bookUpdate = document.querySelector('#book-form-update');

let booklist = [];

class Book {
  constructor(title, author, pages, description, rating = 'none', read, index) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.description = description;
    this.rating = rating;
    this.read = read;
    this.index = index;
  }

  updateReadStatus = function () {
    this.read === true ? (this.read = false) : (this.read = true);
  };
}


function getRating() {
  let rating;
  bookRating.forEach((radio) => {
    if (radio.checked) {
      rating = radio.value;
    }
  });
  return rating;
}

function addToBooklist() {
  let bookIndex = booklist.length;
  let book = new Book(
    bookTitle.value,
    bookAuthor.value,
    bookPages.value,
    bookDescription.value,
    getRating(),
    bookRead.checked,
    bookIndex
  );
  booklist.push(book);
  appendBooksToDom();
  console.log('event happened');
  bookForm.reset();
}

function appendBooksToDom() {
  cardContainer.innerHTML = '';
  booklist.forEach((book, index) => {
    createBookCard(book, index);
  });
  addListenersToCard();
  addListenersToCheckbox();
}

function createBookCard(book, index) {
  let bookIndex = index;
  const bookCard = document.createElement('div');
  bookCard.classList.add('book-card');

  const bookCardTitle = document.createElement('h2');
  bookCardTitle.classList.add('book-card-title');
  bookCardTitle.innerText = book.title;
  bookCard.append(bookCardTitle);

  const bookCardAuthor = document.createElement('p');
  bookCardAuthor.classList.add('book-card-author');
  bookCardAuthor.innerText = `by ${book.author}`;
  bookCard.append(bookCardAuthor);

  const bookCardPages = document.createElement('p');
  bookCardPages.classList.add('book-card-pages');
  bookCardPages.innerText = `${book.pages} pages`;
  bookCard.append(bookCardPages);

  const bookCardDescription = document.createElement('p');
  bookCardDescription.classList.add('book-card-description');
  bookCardDescription.innerText = book.description;
  bookCard.append(bookCardDescription);

  const bookCardInteractiveContainer = document.createElement('div');
  bookCardInteractiveContainer.classList.add('book-card-interactive');
  bookCard.append(bookCardInteractiveContainer);

  const bookCardCheckboxContainer = document.createElement('div');
  bookCardCheckboxContainer.classList.add('book-card-checkboxes');
  bookCardInteractiveContainer.append(bookCardCheckboxContainer);

  const bookCardRating = document.createElement('p');
  bookCardRating.classList.add('book-card-rating');
  bookCardRating.innerHTML = addStarsToBookRating(Number(book.rating));
  bookCardCheckboxContainer.append(bookCardRating);

  const bookCardReadContainer = document.createElement('div');
  bookCardReadContainer.classList.add('book-card-read');
  bookCardCheckboxContainer.append(bookCardReadContainer);

  const bookCardLabel = document.createElement('label');
  bookCardLabel.setAttribute('for', 'book-card-read');
  bookCardLabel.innerText = 'Read?';
  bookCardReadContainer.append(bookCardLabel);

  const bookCardCheckbox = document.createElement('input');
  bookCardCheckbox.checked = book.read;
  bookCardCheckbox.classList.add('book-card-read');
  bookCardCheckbox.setAttribute('data-index', bookIndex);
  bookCardCheckbox.setAttribute('type', 'checkbox');
  bookCardCheckbox.setAttribute('id', `book-card-read ${bookIndex}`);
  bookCardCheckbox.setAttribute('name', 'book-card-read');
  bookCardReadContainer.append(bookCardCheckbox);

  const bookCardButtonContainer = document.createElement('div');
  bookCardButtonContainer.classList.add('book-card-buttons');
  bookCardInteractiveContainer.append(bookCardButtonContainer);

  const editButton = document.createElement('button');
  editButton.innerHTML = '<i class="bx bx-edit-alt"></i>';
  editButton.setAttribute('id', 'edit-button');
  editButton.setAttribute('data-index', bookIndex);
  editButton.classList.add('book-card-button');
  bookCardButtonContainer.append(editButton);

  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = '<i class="bx bx-trash"></i>';
  deleteButton.setAttribute('id', 'delete-button');
  deleteButton.setAttribute('data-index', bookIndex);
  deleteButton.classList.add('book-card-button');
  bookCardButtonContainer.append(deleteButton);

  cardContainer.append(bookCard);
}

function addStarsToBookRating(rating) {
  switch (rating) {
    case 1:
      return `<i class='bx bxs-star orange-star'></i><i class='bx bx-star'></i><i class='bx bx-star'></i><i class='bx bx-star'></i><i class='bx bx-star'></i>`;
      break;
    case 2:
      return `<i class='bx bxs-star orange-star'></i><i class='bx bxs-star orange-star'></i><i class='bx bx-star'></i><i class='bx bx-star'></i><i class='bx bx-star'></i>`;
      break;
    case 3:
      return `<i class='bx bxs-star orange-star'></i><i class='bx bxs-star orange-star'></i><i class='bx bxs-star orange-star'></i><i class='bx bx-star'></i><i class='bx bx-star'></i>`
      break;
    case 4:
     return `<i class='bx bxs-star orange-star'></i><i class='bx bxs-star orange-star'></i><i class='bx bxs-star orange-star'></i><i class='bx bxs-star orange-star'></i><i class='bx bx-star'></i>`
     break;
    case 5:
     return `<i class='bx bxs-star orange-star'></i><i class='bx bxs-star orange-star'></i><i class='bx bxs-star orange-star'></i><i class='bx bxs-star orange-star'></i><i class='bx bxs-star orange-star'></i>`;
     break;
    default:
     return `<i class='bx bx-question-mark'></i><i class='bx bx-question-mark'></i><i class='bx bx-question-mark'></i><i class='bx bx-question-mark'></i><i class='bx bx-question-mark'></i>`
  }
}

function addListenersToCard() {
  const editButton = document.querySelectorAll('#edit-button');
  const deleteButton = document.querySelectorAll('#delete-button');

  editButton.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      editBook(e);
    });
  });

  deleteButton.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      deleteBook(e);
    });
  });
}

function addListenersToCheckbox() {
  const checkbox = document.querySelectorAll('.book-card-read');
  checkbox.forEach((checkbox) => {
    const index = checkbox.dataset.index;
    checkbox.addEventListener('change', (e) => {
      e.stopPropagation();
      booklist[index].updateReadStatus();
      appendBooksToDom();
    });
  });
}

function editBook(e) {
  bookForm.reset();
  const index = e.currentTarget.dataset.index;
  modal.style.display = 'flex';
  bookSubmit.style.display = 'none';
  bookUpdate.style.display = 'block';
  bookTitle.value = booklist[index].title;
  bookAuthor.value = booklist[index].author;
  bookPages.value = booklist[index].pages;
  bookDescription.value = booklist[index].description;
  checkRadioButton(index);
  bookRead.checked = booklist[index].read;
  bookUpdate.setAttribute('data-index', index);
}

function checkRadioButton(index) {
  bookRating.forEach((radio) => {
    if (radio.value === booklist[index].rating) {
      radio.checked = true;
    }
  });
}

function confirmEdit() {
  const index = bookUpdate.dataset.index;
  booklist[index].title = bookTitle.value;
  booklist[index].author = bookAuthor.value;
  booklist[index].pages = bookPages.value;
  booklist[index].description = bookDescription.value;
  booklist[index].rating = getRating();
  booklist[index].read = bookRead.checked;
  appendBooksToDom();
}

function deleteBook(e) {
  let index = e.currentTarget.dataset.index;
  booklist.splice(index, 1);
  appendBooksToDom();
}

function changeTheme() {
  body.classList.toggle('dark')
  if(body.classList.contains('dark')) {
    darkmodeIcon.classList.add('bx-moon');
    darkmodeIcon.classList.remove('bx-sun')
  } else {
    darkmodeIcon.classList.add('bx-sun')
    darkmodeIcon.classList.remove('bx-moon')
  }
}

darkmodeToggle.addEventListener('click', changeTheme);

bookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addToBooklist();
  modal.style.display = 'none';
});

openBookModal.addEventListener('click', () => {
  bookForm.reset();
  modal.style.display = 'flex';
  bookSubmit.style.display = 'block';
  bookUpdate.style.display = 'none';
});

closeBookModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

bookUpdate.addEventListener('click', () => {
  confirmEdit();
  bookForm.reset();
  modal.style.display = 'none';
});

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

let testBooks = [
  {
    title: 'Under Heaven',
    author: 'Guy Gavriel Kay',
    pages: '567',
    description:
      'In Under Heaven, Kay tells a story of honor and power, this time in a setting that evokes the dazzling Tang Dynasty of eighth-century China. In recognition of his service to the Emperor of Kitai, Shen Tai has been sent a mysterious and dangerous gift: 250 Sardian horses. Wisely the gift comes with the stipulation that the horses must be claimed in person. Otherwise, he would probably be dead already.',
    rating: '5',
    read: true,
    index: 0,
  },
  {
    title: 'The Book of the New Sun',
    author: 'Gene Wolfe',
    pages: '950',
    description: `Recently voted the greatest fantasy of all time, after The Lord of the Rings and The Hobbit, Gene Wolfe's The Book of the New Sun is an extraordinary epic, set a million years in the future, on an Earth transformed in mysterious and wondrous ways, in a time when our present culture is no longer even a memory. Severian, the central character, is a torturer, exiled from his guild after falling in love with one of his victims, and journeying to the distant city of Thrax, armed with his ancient executioner's sword, Terminus Est.`,
    rating: '5',
    read: true,
    index: 1,
  },
  {
    title: `Assassin's Apprentice`,
    author: 'Robin Hobb',
    pages: '435',
    description: `Born on the wrong side of the sheets, Fitz, son of Chivalry Farseer, is a royal bastard, cast out into the world, friendless and lonely. Only his magical link with animals - the old art known as the Wit - gives him solace and companionship. But the Wit, if used too often, is a perilous magic, and one abhorred by the nobility.

    So when Fitz is finally adopted into the royal household, he must give up his old ways and embrace a new life of weaponry, scribing, courtly manners; and how to kill a man secretly, as he trains to become a royal assassin.`,
    rating: '5',
    read: true,
    index: 2,
  },
  {
    title: 'The Darkness That Comes Before',
    author: 'R. Scott Bakker',
    pages: '608',
    description: `The first book in R. Scott Bakker's Prince of Nothing series creates a world from whole cloth-its language and classes of people, its cities, religions, mysteries, taboos, and rituals. It's a world scarred by an apocalyptic past, evoking a time both two thousand years past and two thousand years into the future, as untold thousands gather for a crusade. Among them, two men and two women are ensnared by a mysterious traveler, Anasûrimbor Kellhus - part warrior, part philosopher, part sorcerous, charismatic presence - from lands long thought dead. The Darkness That Comes Before is a history of this great holy war, and like all histories, the survivors write its conclusion.`,
    rating: '5',
    read: true,
    index: 3,
  },
  {
    title: 'Daughter of the Forest',
    author: 'Juliet Marillier',
    pages: '554',
    description: `Lord Colum of Sevenwaters is blessed with seven children, but it is Sorcha, the youngest child and only daughter, who is destined to defend her family and protect her home from the enemy. For her father has been bewitched by the Lady Oonagh, and her brothers bound by a spell only Sorcha can lift. To do so, she must endure a long exile from all that is familiar, and complete a task that will tax her in body and mind. When Sorcha finds herself in the hands of the enemy, both her own life and those of her brothers hang in the balance.

    Daughter of the Forest is based on a traditional folk tale, The Six Swans. It combines classic fairy tale elements (a wicked stepmother, a magical transformation) with a story of a real family plunged into a series of events that tests their courage and loyalty to the limit. The novel is set in early medieval Ireland and is for adult readers.`,
    rating: '5',
    read: true,
    index: 4,
  },
  {
    title: 'Senlin Ascends',
    author: 'Josiah Bancroft',
    pages: '448',
    description: `The Tower of Babel is the greatest marvel in the world. Immense as a mountain, the ancient Tower holds unnumbered ringdoms, warring and peaceful, stacked one on the other like the layers of a cake. It is a world of geniuses and tyrants, of airships and steam engines, of unusual animals and mysterious machines.

    Soon after arriving for his honeymoon at the Tower, the mild-mannered headmaster of a small village school, Thomas Senlin, gets separated from his wife, Marya, in the overwhelming swarm of tourists, residents, and miscreants.
    
    Senlin is determined to find Marya, but to do so he'll have to navigate madhouses, ballrooms, and burlesque theaters. He must survive betrayal, assassins, and the long guns of a flying fortress. But if he hopes to find his wife, he will have to do more than just endure.
    
    This quiet man of letters must become a man of action.`,
    rating: '5',
    read: true,
    index: 5,
  },
  {
    title: 'The Chronicles of Amber #1-5',
    author: 'Roger Zelazny',
    pages: '772',
    description: `Amber is the one real world, casting infinite reflections of itself - shadow worlds, which can be manipulated by those of royal Amberite blood. But the royal family is torn apart by jealousies and suspicion; the disappearance of the patriarch Oberon has intensified the internal conflict by leaving the throne apparently for grabs; and amnesia has robbed Corwin, Crown Prince of Amber his memory - even the fact that he is rightful heir to the throne.`,
    rating: '5',
    read: true,
    index: 6,
  },
  {
    title: 'Kings of the Wyld',
    author: 'Nicholas Eames',
    pages: '502',
    description: `Clay Cooper and his band were once the best of the best -- the meanest, dirtiest, most feared crew of mercenaries this side of the Heartwyld.

    Their glory days long past, the mercs have grown apart and grown old, fat, drunk - or a combination of the three. Then an ex-bandmate turns up at Clay's door with a plea for help. His daughter Rose is trapped in a city besieged by an enemy one hundred thousand strong and hungry for blood. Rescuing Rose is the kind of mission that only the very brave or the very stupid would sign up for.
    
    It's time to get the band back together for one last tour across the Wyld.`,
    rating: '5',
    read: true,
    index: 7,
  },
];

function appendTestBooks() {
  cardContainer.innerHTML = '';
  testBooks.forEach((book) => {
    booklist.push(
      new Book(
        book.title,
        book.author,
        book.pages,
        book.description,
        book.rating,
        book.read,
        book.index
      )
    );
  });
  appendBooksToDom();
}

window.addEventListener('load', appendTestBooks());
