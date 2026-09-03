import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

function getStoredUser() {
  try {
    const stored = localStorage.getItem('citizen-portal-user')
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser)
  const [loading, setLoading] = useState(false)

  const login = async (username, password, captchaToken) => {
    setLoading(true)
    // Simulate API call — replace with POST /api/auth/login
    await new Promise(r => setTimeout(r, 800))

    if (username && password.length >= 6) {
      const newUser = {
        id: 1,
        username,
        email: username.includes('@') ? username : `${username}@citizen.gov.in`,
        fullName: username.includes('@')
          ? username.split('@')[0].replace(/\./g, ' ').replace(/\b\w/g, c => c.toUpperCase())
          : username.replace(/\b\w/g, c => c.toUpperCase()),
        phone: '',
        address: '',
      }
      setUser(newUser)
      localStorage.setItem('citizen-portal-user', JSON.stringify(newUser))
      setLoading(false)
      return { success: true }
    }
    setLoading(false)
    return { success: false, error: 'Invalid username or password.' }
  }

  const register = async (fullName, email, password) => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    const newUser = {
      id: 1,
      username: email.split('@')[0],
      email,
      fullName,
      phone: '',
      address: '',
    }
    setUser(newUser)
    localStorage.setItem('citizen-portal-user', JSON.stringify(newUser))
    setLoading(false)
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('citizen-portal-user')
  }

  const updateProfile = (updates) => {
    const updated = { ...user, ...updates }
    setUser(updated)
    localStorage.setItem('citizen-portal-user', JSON.stringify(updated))
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
