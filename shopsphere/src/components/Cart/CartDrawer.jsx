import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { removeFromCart, updateQuantity, clearCart, closeCart } from '../../store/cartSlice'
import styles from './CartDrawer.module.scss'

function CartDrawer() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items, isOpen } = useSelector(state => state.cart)
  const { isAuthenticated } = useSelector(state => state.auth)

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleCheckout = () => {
    dispatch(closeCart())
    if (isAuthenticated) {
      navigate('/checkout')
    } else {
      navigate('/login')
    }
  }

  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={() => dispatch(closeCart())} />}

      <div className={`${styles.drawer} ${isOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <h2>🛒 Your Cart ({items.length})</h2>
          <button onClick={() => dispatch(closeCart())} className={styles.closeBtn}>✕</button>
        </div>

        {items.length === 0 ? (
          <div className={styles.empty}>
            <span>🛍</span>
            <p>Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className={styles.items}>
              {items.map(item => (
                <div key={item.id} className={styles.item}>
                  <img src={item.image} alt={item.name} className={styles.itemImg} />
                  <div className={styles.itemInfo}>
                    <p className={styles.itemName}>{item.name}</p>
                    <p className={styles.itemPrice}>₹{item.price.toLocaleString()}</p>
                    <div className={styles.qty}>
                      <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}>−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}>+</button>
                    </div>
                  </div>
                  <button className={styles.removeBtn} onClick={() => dispatch(removeFromCart(item.id))}>🗑</button>
                </div>
              ))}
            </div>

            <div className={styles.footer}>
              <div className={styles.total}>
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
              <button className={styles.clearBtn} onClick={() => dispatch(clearCart())}>Clear Cart</button>
              <button className={styles.checkoutBtn} onClick={handleCheckout}>
                Proceed to Checkout →
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default CartDrawer
