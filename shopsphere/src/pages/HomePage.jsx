import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../store/cartSlice'
import ProductCard from '../components/ProductCard/ProductCard'
import { products } from '../data/products'
import styles from './HomePage.module.scss'

function HomePage() {
  const featured = products.filter(p => p.badge === 'Bestseller')

  return (
    <div>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Discover Products You'll Love</h1>
          <p>Premium quality. Unbeatable prices. Fast delivery.</p>
          <Link to="/products" className={styles.heroBtn}>Shop Now →</Link>
        </div>
      </section>

      {/* Featured */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>⭐ Bestsellers</h2>
          <Link to="/products">View All →</Link>
        </div>
        <div className={styles.grid}>
          {featured.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* All products preview */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>🔥 New Arrivals</h2>
          <Link to="/products">View All →</Link>
        </div>
        <div className={styles.grid}>
          {products.slice(0, 4).map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  )
}

export default HomePage
