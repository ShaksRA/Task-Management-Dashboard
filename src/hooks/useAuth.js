import { useState } from 'react'
import { getItem, setItem, removeItem } from '../utils/storage'
import { LS_KEYS } from '../data/constants'

/**
 * useAuth — manages user session stored in localStorage.
 * Supports sign-up, login, and logout.
 */
export function useAuth() {
  const [user, setUser] = useState(() => getItem(LS_KEYS.SESSION, null))

  const login = (userData) => {
    setItem(LS_KEYS.SESSION, userData)
    setUser(userData)
  }

  const logout = () => {
    removeItem(LS_KEYS.SESSION)
    setUser(null)
  }

  /**
   * Registers a new user and logs them in.
   * Returns { success, error }
   */
  const register = ({ name, email, password }) => {
    const users = getItem(LS_KEYS.USERS, [])
    if (users.find((u) => u.email === email)) {
      return { success: false, error: 'Email already registered.' }
    }
    const newUser = { id: `u_${Date.now()}`, name, email, password }
    setItem(LS_KEYS.USERS, [...users, newUser])
    login(newUser)
    return { success: true }
  }

  /**
   * Validates credentials against stored users.
   * Returns { success, error }
   */
  const signIn = ({ email, password }) => {
    const users = getItem(LS_KEYS.USERS, [])
    const match = users.find((u) => u.email === email && u.password === password)
    if (!match) return { success: false, error: 'Invalid email or password.' }
    login(match)
    return { success: true }
  }

  return { user, login, logout, register, signIn }
}
