import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toggleCart } from '../../store/cartSlice'
import { logout } from '../../store/authSlice'
import styles from './Navbar.module.scss'

function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cartCount = useSelector(state =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  )
  const { isAuthenticated, user } = useSelector(state => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.brand}>
        🛍 <span>ShopSphere</span>
      </Link>

      <div className={styles.links}>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
      </div>

      <div className={styles.actions}>
        {isAuthenticated ? (
          <>
            <span className={styles.welcome}>Hi, {user?.name} 👋</span>
            <button onClick={handleLogout} className={styles.authBtn}>Logout</button>
          </>
        ) : (
          <Link to="/login" className={styles.authBtn}>Login</Link>
        )}

        <button className={styles.cartBtn} onClick={() => dispatch(toggleCart())}>
          🛒
          {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
        </button>
      </div>
    </nav>
  )
}

export default Navbar
