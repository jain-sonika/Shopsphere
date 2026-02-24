import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearCart } from '../store/cartSlice'
import styles from './CheckoutPage.module.scss'

function CheckoutPage() {
  const { items } = useSelector(state => state.cart)
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [placed, setPlaced] = useState(false)

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handlePlaceOrder = (e) => {
    e.preventDefault()
    setPlaced(true)
    dispatch(clearCart())
    setTimeout(() => navigate('/'), 3000)
  }

  if (placed) {
    return (
      <div className={styles.success}>
        <span>🎉</span>
        <h2>Order Placed Successfully!</h2>
        <p>Thank you, {user?.name}! Redirecting to home...</p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <h1>Checkout</h1>

      <div className={styles.layout}>
        <form onSubmit={handlePlaceOrder} className={styles.form}>
          <h2>Shipping Details</h2>

          <div className={styles.row}>
            <div className={styles.field}>
              <label>First Name</label>
              <input type="text" defaultValue={user?.name?.split(' ')[0]} required />
            </div>
            <div className={styles.field}>
              <label>Last Name</label>
              <input type="text" />
            </div>
          </div>

          <div className={styles.field}>
            <label>Email</label>
            <input type="email" defaultValue={user?.email} required />
          </div>

          <div className={styles.field}>
            <label>Address</label>
            <input type="text" placeholder="Street address" required />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label>City</label>
              <input type="text" required />
            </div>
            <div className={styles.field}>
              <label>PIN Code</label>
              <input type="text" maxLength={6} required />
            </div>
          </div>

          <h2 style={{ marginTop: '1.5rem' }}>Payment</h2>
          <div className={styles.paymentNote}>
            🔒 Secure payment via Razorpay (integration ready)
          </div>

          <button type="submit" className={styles.placeBtn}>
            Place Order — ₹{total.toLocaleString()} →
          </button>
        </form>

        <div className={styles.summary}>
          <h2>Order Summary</h2>
          {items.map(item => (
            <div key={item.id} className={styles.summaryItem}>
              <img src={item.image} alt={item.name} />
              <div>
                <p>{item.name}</p>
                <span>Qty: {item.quantity}</span>
              </div>
              <p>₹{(item.price * item.quantity).toLocaleString()}</p>
            </div>
          ))}
          <div className={styles.summaryTotal}>
            <span>Total</span>
            <span>₹{total.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
