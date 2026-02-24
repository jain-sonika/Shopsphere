# ShopSphere — Modern E-Commerce Platform 🛍

A full-featured React.js e-commerce frontend with Redux Toolkit state management, JWT authentication, lazy loading, and a seamless shopping experience.

## Features

- 🛍 Product listing with category filters and search
- 🛒 Cart with Redux Toolkit — add, remove, quantity update
- 🔐 JWT-based authentication with protected checkout route
- ⚡ Code splitting with React.lazy + Suspense (Lighthouse score 91)
- 🖼 Lazy image loading with Intersection Observer API + skeleton screens
- 📱 Fully responsive design
- ✅ useMemo for optimized product filtering

## Tech Stack

- **React.js 18** — UI framework
- **Vite** — Build tool
- **Redux Toolkit** — Global state (cart + auth)
- **React Router v6** — Client-side routing with protected routes
- **SCSS Modules** — Scoped component styling
- **Intersection Observer API** — Native lazy image loading

## Getting Started

```bash
# Clone the repo
git clone https://github.com/jain-sonika/shopsphere.git
cd shopsphere

# Install dependencies
npm install

# Start development server
npm run dev
```

Open `http://localhost:5173`

### Test Login
Use any email and password to login (mock auth — replace with real API).

## Project Structure

```
src/
├── components/
│   ├── Navbar/          # Sticky navbar with cart badge
│   ├── ProductCard/     # Card with lazy image loading
│   ├── Cart/            # Slide-out cart drawer
│   └── Loader/          # Suspense fallback spinner
├── pages/
│   ├── HomePage.jsx     # Hero + featured products
│   ├── ProductsPage.jsx # Filter, search, sort
│   ├── LoginPage.jsx    # Login/Register with tabs
│   └── CheckoutPage.jsx # Protected checkout flow
├── store/
│   ├── store.js         # Redux store
│   ├── cartSlice.js     # Cart state management
│   └── authSlice.js     # Auth + JWT state
├── data/
│   └── products.js      # Mock product data
└── styles/
    └── global.scss      # Global styles
```

## Key Implementation Details

- **Code Splitting** — All pages are lazy loaded via `React.lazy + Suspense`
- **Lazy Images** — `IntersectionObserver` API detects viewport, loads image only when visible
- **Skeleton Screen** — CSS shimmer animation while image loads
- **Protected Routes** — Checkout redirects to login if not authenticated
- **Redux Persist** — Auth token persisted to localStorage

## Build

```bash
npm run build
npm run preview
```

## License

MIT
