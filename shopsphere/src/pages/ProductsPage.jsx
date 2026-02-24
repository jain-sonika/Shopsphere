import React, { useState, useMemo } from 'react'
import ProductCard from '../components/ProductCard/ProductCard'
import { products, categories } from '../data/products'
import styles from './ProductsPage.module.scss'

function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('default')

  const filtered = useMemo(() => {
    let list = products

    if (activeCategory !== 'All') {
      list = list.filter(p => p.category === activeCategory)
    }

    if (search.trim()) {
      list = list.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
    if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating)

    return list
  }, [activeCategory, search, sort])

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <h1>All Products <span>{filtered.length} items</span></h1>

        <div className={styles.controls}>
          <input
            type="text"
            placeholder="🔍 Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className={styles.search}
          />

          <select value={sort} onChange={e => setSort(e.target.value)} className={styles.sort}>
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      <div className={styles.categories}>
        {categories.map(cat => (
          <button
            key={cat}
            className={`${styles.catBtn} ${activeCategory === cat ? styles.active : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className={styles.noResults}>
          <span>😕</span>
          <p>No products found</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  )
}

export default ProductsPage
