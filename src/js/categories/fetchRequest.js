import axios from 'axios';

const BASE_URL = 'https://books-backend.p.goit.global/books';

class FetchBooks {
  constructor() {
    this.api = axios.create({
      baseURL: BASE_URL,
    });
    this.booksCache = new Map();
  }

  async getCategoriesList() {
    const { data } = await this.api.get('/category-list');
    if (!Array.isArray(data)) return [];
    return data.filter(
      category => category && category.list_name && category.list_name.trim() !== ''
    );
  }

  async getBestSellers() {
    const { data } = await this.api.get('/top-books');
    if (!Array.isArray(data)) return [];
    const valid = data.filter(
      item =>
        item &&
        item.list_name &&
        item.list_name.trim() !== '' &&
        Array.isArray(item.books) &&
        item.books.length > 0
    );

    // Cache books in memory for instantaneous modal opening
    valid.forEach(category => {
      category.books.forEach(book => {
        if (book && book._id) {
          this.booksCache.set(book._id, book);
        }
      });
    });

    return valid;
  }

  async getBooksByCategory(categoryName) {
    const { data } = await this.api.get(
      `/category?category=${categoryName}`
    );
    const books = Array.isArray(data) ? data : [];

    // Cache books in memory for instantaneous modal opening
    books.forEach(book => {
      if (book && book._id) {
        this.booksCache.set(book._id, book);
      }
    });

    return books;
  }

  async getBookById(bookId) {
    // 1. Instant return from cache (0ms delay)
    if (this.booksCache.has(bookId)) {
      return this.booksCache.get(bookId);
    }
    // 2. Fallback fetch
    const { data } = await this.api.get(`/${bookId}`);
    if (data && data._id) {
      this.booksCache.set(data._id, data);
    }
    return data;
  }
}

export const fetchBooks = new FetchBooks();
