# 📚 Bookshelf - Online Book Catalog & Reading List

> **NOTE:** This repository is an active, fully functional clone and maintenance fork of the original team graduation project [project-new_skill](https://github.com/lezver/project-new_skill), where the original live deployment ceased functioning due to unhandled API changes. This version resolves the infinite loading spinner, fixes modal window interactions, caches books for instant opening, and restores live GitHub Pages functionality.

🔗 **Live Demo:** [https://iberikofer.github.io/bookshelf-page/](https://iberikofer.github.io/bookshelf-page/)

---

## 🌟 Key Features

- **📖 Best Sellers Overview**: Browse top books grouped by New York Times bestseller categories with interactive quick-view modal popups.
- **🏷️ Category Filtering**: Instant category navigation and curated book listings sorted by genre.
- **🔍 Book Detail Modal**: Interactive popup showing detailed book synopsis, high-res book covers, and direct purchase links (Amazon, Apple Books, Bookshop).
- **🛒 Shopping List / Reading List**: Add and remove books to a personal reading list backed by `localStorage` with pagination controls.
- **🌓 Dynamic Theme Switcher**: Instant switching between Dark and Light mode with persistent state.
- **🇺🇦 Support Ukraine Foundation Widget**: Responsive charity slider supporting Ukrainian humanitarian organizations.

---

## 🛠️ Tech Stack

- **Core**: Semantic HTML5, CSS3, Modern JavaScript (ES6+ Modules)
- **Styling**: SCSS / Sass, BEM methodology, Flexbox & CSS Grid
- **Bundler**: [Parcel](https://parceljs.org/)
- **Libraries & Utilities**:
  - `axios` — Asynchronous REST API requests
  - `notiflix` — Toast alerts and loading indicators
  - `tui-pagination` — Shopping list pagination
  - `swiper` — Responsive charity slider
  - `modern-normalize` — Cross-browser CSS baseline

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+)
- `npm` package manager

### Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/iberikofer/bookshelf-page.git
   ```
2. Navigate to the project directory:
   ```bash
   cd bookshelf-page
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start local development server:
   ```bash
   npm start
   ```
5. Build for production:
   ```bash
   npm run build
   ```

---

## 👥 Original Team & Contributions

1. **Vladislav Hulida** ([lezver](https://github.com/lezver)) — *Team Lead*: Home section, Auth modal, Scroll-up button, Loader, Project setup.
2. **Roma Chernyak** ([RomaCherniak](https://github.com/RomaCherniak)) — *Scrum Master*: Header navigation.
3. **Serhii Andriienko** ([SerhiiAndriienko](https://github.com/SerhiiAndriienko)) — Categories sidebar.
4. **Dmytro Brekalo** ([DmytroBrekalo](https://github.com/DmytroBrekalo)) — Support Ukraine foundation slider.
5. **Oleh Linskyi** ([OlehLinskyy](https://github.com/OlehLinskyy)) — Shopping list & pagination.
6. **Yaroslav Sych** ([iberikofer](https://github.com/iberikofer)) — Interactive book details modal, API error resilience, local cache, maintenance & deployment restoration.

---

## 📄 License

Created for educational and portfolio demonstration purposes.