import { fetchBooks } from '../categories/fetchRequest';

const refs = {
  listOfBooks: document.querySelector('.home__items'),
  backdrop: document.querySelector('.backdrop'),
  modalWindow: document.querySelector('.modal-window'),
};

const modalWindowCloseIcon = refs.modalWindow.querySelector('.close-icon');
const modalWindowCloseButton =
  refs.modalWindow.querySelector('.close-icon-button');
const imageContainer = document.querySelector('.image-container');
const bookName = refs.modalWindow.querySelector('.book-name');
const bookAuthor = refs.modalWindow.querySelector('.book-author');
const bookDescription = refs.modalWindow.querySelector('.book-description');
const amazonLink = refs.modalWindow.querySelector('.amazon-link');
const bookLink = refs.modalWindow.querySelector('.book-link');
const bookShopLink = refs.modalWindow.querySelector('.book-shop-link');
const addBookButton = refs.modalWindow.querySelector('.add-book-button');
const removeBookContainer = refs.modalWindow.querySelector(
  '.remove-book-container'
);
const removeBookButton = removeBookContainer.querySelector(
  '.remove-book-button'
);

let currentBookData = null;

function getShoppingList() {
  try {
    const list = localStorage.getItem('shopping_list');
    return list ? JSON.parse(list) : [];
  } catch {
    return [];
  }
}

function updateModalButtonState() {
  if (!currentBookData) return;
  const shoppingList = getShoppingList();
  const isInList = shoppingList.some(
    obj => obj.id === currentBookData.id || (currentBookData.title && obj.title === currentBookData.title)
  );

  if (isInList) {
    addBookButton.classList.add('add-book-button-none');
    refs.modalWindow.classList.add('colored-modal-border');
    removeBookContainer.classList.add('remove-book-container-visible');
  } else {
    addBookButton.classList.remove('add-book-button-none');
    refs.modalWindow.classList.remove('colored-modal-border');
    removeBookContainer.classList.remove('remove-book-container-visible');
  }
}

function triggerModalAnimation(type) {
  refs.modalWindow.classList.remove('modal-stretch', 'modal-shrink');
  void refs.modalWindow.offsetWidth; // Force reflow to re-trigger animation
  refs.modalWindow.classList.add(type === 'stretch' ? 'modal-stretch' : 'modal-shrink');
}

// Global button event listeners (attached once, avoiding duplicate/stale listeners)
addBookButton.addEventListener('click', () => {
  if (!currentBookData) return;
  const shoppingList = getShoppingList();
  const exists = shoppingList.some(
    obj => obj.id === currentBookData.id || (currentBookData.title && obj.title === currentBookData.title)
  );
  if (!exists) {
    shoppingList.push(currentBookData);
    localStorage.setItem('shopping_list', JSON.stringify(shoppingList));
  }
  triggerModalAnimation('stretch');
  updateModalButtonState();
});

removeBookButton.addEventListener('click', () => {
  if (!currentBookData) return;
  let shoppingList = getShoppingList();
  shoppingList = shoppingList.filter(
    obj => obj.id !== currentBookData.id && obj.title !== currentBookData.title
  );
  localStorage.setItem('shopping_list', JSON.stringify(shoppingList));
  triggerModalAnimation('shrink');
  updateModalButtonState();
});

// OPEN MODAL WINDOW
refs.listOfBooks.addEventListener('click', async e => {
  const targetCard = e.target.closest('.img__wrapper') || (e.target.classList.contains('img__book') ? e.target : null);
  if (!targetCard) return;

  const bookId = targetCard.dataset.id || e.target.dataset.id;
  if (!bookId) return;

  document.body.classList.add('no-scroll-body-js');

  try {
    const bookDataObj = await fetchBooks.getBookById(bookId);
    const {
      _id,
      book_image,
      title,
      list_name,
      author,
      description,
      buy_links = [],
    } = bookDataObj;

    const defaultImage = `<img class="img__cap" width="180" height="265" srcset="
      ./images/png/home/cap.jpg    1x,
      ./images/png/home/cap@2x.jpg 2x
    "
    src="./images/png/home/cap.jpg"
    alt="cap" loading="lazy"
    />`;
    const bookImage = `<img src="${book_image}" load="lazy" alt="Book image" class="book-image" />`;
    imageContainer.innerHTML = book_image ? bookImage : defaultImage;

    bookName.textContent = title || '';
    bookAuthor.textContent = author || '';
    bookDescription.innerHTML = description ? description : '&nbsp;';

    const amazonObj = buy_links.find(link => link.name === 'Amazon') || buy_links[0] || { name: 'Amazon', url: '#' };
    const appleBooksObj = buy_links.find(link => link.name === 'Apple Books') || buy_links[1] || { name: 'Apple Books', url: '#' };
    const bookShopObj = buy_links.find(link => link.name === 'Bookshop' || link.name === 'Bookshop.org' || link.name === 'Barnes and Noble') || buy_links[4] || buy_links[2] || { name: 'Bookshop', url: '#' };

    amazonLink.href = amazonObj.url || '#';
    bookLink.href = appleBooksObj.url || '#';
    bookShopLink.href = bookShopObj.url || '#';

    currentBookData = {
      id: _id,
      book_image,
      title,
      list_name,
      author,
      description,
      buy_links: [amazonObj, appleBooksObj, bookShopObj],
    };

    refs.modalWindow.id = _id;
    refs.modalWindow.classList.remove('modal-stretch', 'modal-shrink');
    updateModalButtonState();

    refs.backdrop.classList.add('backdrop-visible');
  } catch (error) {
    console.error('Error fetching book details:', error);
    document.body.classList.remove('no-scroll-body-js');
  }
});

// CLOSE MODAL WINDOW
function closeModal() {
  refs.modalWindow.classList.remove('modal-stretch', 'modal-shrink');
  refs.backdrop.classList.remove('backdrop-visible');
  document.body.classList.remove('no-scroll-body-js');
}

document.addEventListener('click', e => {
  if (
    e.target === refs.backdrop ||
    e.target === modalWindowCloseButton ||
    modalWindowCloseButton.contains(e.target)
  ) {
    closeModal();
  }
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeModal();
  }
});

// PREVENT MODAL FLASH ON LOAD (70% faster appearance)
setTimeout(() => {
  refs.backdrop.classList.add('backdrop-display-block-js');
}, 250);
