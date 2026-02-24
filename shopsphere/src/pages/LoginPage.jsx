import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../store/authSlice'
import styles from './LoginPage.module.scss'

function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '', name: '' })
  const [isRegister, setIsRegister] = useState(false)
  const [error, setError] = useState('')

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!form.email || !form.password) {
      setError('Please fill all fields')
      return
    }

    // Mock auth — replace with real API
    const token = btoa(`${form.email}:${Date.now()}`)
    dispatch(loginSuccess({
      user: { email: form.email, name: form.name || form.email.split('@')[0], role: 'buyer' },
      token
    }))
    navigate('/')
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Link to="/" className={styles.back}>← Back to Shop</Link>

        <div className={styles.header}>
          <h1>🛍 ShopSphere</h1>
          <p>{isRegister ? 'Create your account' : 'Welcome back!'}</p>
        </div>

        <div className={styles.tabs}>
          <button className={!isRegister ? styles.active : ''} onClick={() => setIsRegister(false)}>Login</button>
          <button className={isRegister ? styles.active : ''} onClick={() => setIsRegister(true)}>Register</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {isRegister && (
            <div className={styles.field}>
              <label>Full Name</label>
              <input type="text" name="name" placeholder="Sonika Jain" value={form.name} onChange={handleChange} />
            </div>
          )}
          <div className={styles.field}>
            <label>Email</label>
            <input type="email" name="email" placeholder="you@example.com" value={form.email} onChange={handleChange} />
          </div>
          <div className={styles.field}>
            <label>Password</label>
            <input type="password" name="password" placeholder="••••••••" value={form.password} onChange={handleChange} />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={styles.btn}>
            {isRegister ? 'Create Account' : 'Login'} →
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
