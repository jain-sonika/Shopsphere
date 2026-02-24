import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], isOpen: false },
  reducers: {
    addToCart(state, action) {
      const existing = state.items.find(i => i.id === action.payload.id)
      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter(i => i.id !== action.payload)
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload
      const item = state.items.find(i => i.id === id)
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(i => i.id !== id)
        } else {
          item.quantity = quantity
        }
      }
    },
    clearCart(state) {
      state.items = []
    },
    toggleCart(state) {
      state.isOpen = !state.isOpen
    },
    closeCart(state) {
      state.isOpen = false
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart, toggleCart, closeCart } = cartSlice.actions
export default cartSlice.reducer
