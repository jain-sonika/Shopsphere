import { createSlice } from '@reduxjs/toolkit'

const token = localStorage.getItem('ss_token')
const user = localStorage.getItem('ss_user')

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: user ? JSON.parse(user) : null,
    token: token || null,
    isAuthenticated: !!token,
  },
  reducers: {
    loginSuccess(state, action) {
      const { user, token } = action.payload
      state.user = user
      state.token = token
      state.isAuthenticated = true
      localStorage.setItem('ss_token', token)
      localStorage.setItem('ss_user', JSON.stringify(user))
    },
    logout(state) {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      localStorage.removeItem('ss_token')
      localStorage.removeItem('ss_user')
    },
  },
})

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer
