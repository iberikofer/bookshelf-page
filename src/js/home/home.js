import { addLoader, removeLoader } from '../loader/loader';
import { refs } from './refsOfTags';
import { fetchBooks } from '../categories/fetchRequest';

// CREATE MARKUP CATEGORIES >

export const createMarkupCategories = arr => {
  if (!Array.isArray(arr) || arr.length === 0) {
    refs.homeItems.innerHTML = '<li class="no-books-found"><p>No books found in this category.</p></li>';
    removeLoader();
    return;
  }

  const markup = arr.reduce((acc, { book_image, title, author, _id }) => {
    const img = book_image
      ? `<img class="img__book" data-id="${_id}" width="180" height="265" loading="lazy" src="${book_image}" alt="${title || 'book'}" />`
      : refs.mobCapImg;

    return (
      acc +
      `
      <li class="home__item-category">
        <div class="img__wrapper" data-id="${_id}">
          ${img}
        </div>
        <h2>${title || 'Untitled'}</h2>
        <span>${author || 'Unknown Author'}</span>
      </li>
      `
    );
  }, '');

  refs.homeItems.innerHTML = markup;

  removeLoader();
};

// >

// FIND CATEGORIES >>

const findCategory = async e => {
  if (e.target.className === 'category-btn') {
    try {
      addLoader();

      const category = e.target.dataset.category.replace(/ /g, '+');

      const response = await fetchBooks.getBooksByCategory(category);

      window.scrollTo({ top: 0, behavior: 'smooth' });

      createMarkupCategories(response);

      refs.homeItems.classList.add('home__items-category');
    } catch (error) {
      console.error('Error loading category books:', error);
    } finally {
      removeLoader();
    }

    e.target.disabled = true;

    setTimeout(() => {
      e.target.disabled = false;
    }, 1000);
  }
};

// >>

// CREATE MARKUP BEST BOOKS >>>

export const createMarkupBestBooks = arr => {
  refs.homeItems.classList.remove('home__items-category');

  if (!Array.isArray(arr) || arr.length === 0) {
    refs.homeItems.innerHTML = '<li class="no-books-found"><p>No best sellers found.</p></li>';
    removeLoader();
    return;
  }

  const validCategories = arr.filter(
    item =>
      item &&
      item.list_name &&
      item.list_name.trim() !== '' &&
      Array.isArray(item.books) &&
      item.books.length > 0
  );

  const markup = validCategories
    .map(({ list_name, books }) => {
      const booksMarkup = books
        .slice(0, 5)
        .map(book => {
          const img = book.book_image
            ? `<img class="img__book" data-id="${book._id}" width="180" height="265" loading="lazy" src="${book.book_image}" alt="${book.title || 'book'}" />`
            : refs.mobCapImg;

          return `
            <li>
              <div class="img__wrapper" data-id="${book._id}">
                ${img}
              </div>
              <h2>${book.title || 'Untitled'}</h2>
              <span>${book.author || 'Unknown Author'}</span>
            </li>
          `;
        })
        .join('');

      return `
        <li class="home__item">
          <p>${list_name}</p>
          <ul>
            ${booksMarkup}
          </ul>
          <button class="category-btn" type="button" data-category="${list_name}">
            see more
          </button>
        </li>
      `;
    })
    .join('');

  refs.homeTitle.innerHTML = 'Best Sellers <span>Books</span>';

  refs.homeItems.innerHTML = markup;

  removeLoader();
};

// >>>

// FIND BEST BOOOKS >>>>

const fetchTopBooks = async () => {
  try {
    addLoader();

    const response = await fetchBooks.getBestSellers();

    createMarkupBestBooks(response);
  } catch (error) {
    console.error('Error fetching best seller books:', error);
  } finally {
    removeLoader();
  }
};

fetchTopBooks();

// >>>>

refs.homeItems.addEventListener('click', findCategory);

