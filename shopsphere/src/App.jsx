import React, { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from './components/Navbar/Navbar'
import CartDrawer from './components/Cart/CartDrawer'
import Loader from './components/Loader/Loader'

// Lazy loaded pages — code splitting
const HomePage = lazy(() => import('./pages/HomePage'))
const ProductsPage = lazy(() => import('./pages/ProductsPage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'))

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useSelector(state => state.auth)
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

function App() {
  return (
    <>
      <Navbar />
      <CartDrawer />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
