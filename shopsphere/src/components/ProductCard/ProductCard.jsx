import React, { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../store/cartSlice'
import styles from './ProductCard.module.scss'

// Lazy image with Intersection Observer
function LazyImage({ src, alt }) {
  const [loaded, setLoaded] = useState(false)
  const [inView, setInView] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect() } },
      { threshold: 0.1 }
    )
    if (imgRef.current) observer.observe(imgRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={imgRef} className={styles.imgWrapper}>
      {!loaded && <div className={styles.skeleton} />}
      {inView && (
        <img
          src={src}
          alt={alt}
          className={`${styles.img} ${loaded ? styles.imgLoaded : ''}`}
          onLoad={() => setLoaded(true)}
          loading="lazy"
        />
      )}
    </div>
  )
}

function StarRating({ rating }) {
  return (
    <div className={styles.stars}>
      {'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))}
      <span>{rating}</span>
    </div>
  )
}

function ProductCard({ product }) {
  const dispatch = useDispatch()
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    dispatch(addToCart(product))
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className={styles.card}>
      {product.badge && (
        <span className={`${styles.badge} ${styles[product.badge.toLowerCase()]}`}>
          {product.badge}
        </span>
      )}

      <LazyImage src={product.image} alt={product.name} />

      <div className={styles.body}>
        <p className={styles.category}>{product.category}</p>
        <h3 className={styles.name}>{product.name}</h3>
        <StarRating rating={product.rating} />
        <p className={styles.reviews}>{product.reviews} reviews</p>

        <div className={styles.footer}>
          <span className={styles.price}>₹{product.price.toLocaleString()}</span>
          <button
            className={`${styles.addBtn} ${added ? styles.added : ''}`}
            onClick={handleAdd}
          >
            {added ? '✓ Added' : '+ Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
