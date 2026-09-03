import { createContext, useContext, useState } from 'react'

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

  const login = async (username, password) => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 200))

    if (username.trim() && password.trim()) {
      const newUser = {
        id: 1,
        username: username.trim(),
        email: username.includes('@') ? username : `${username}@citizen.gov.in`,
        fullName: username.includes('@')
          ? username.split('@')[0].replace(/\./g, ' ').replace(/\b\w/g, c => c.toUpperCase())
          : username.trim().replace(/\b\w/g, c => c.toUpperCase()),
      }
      setUser(newUser)
      localStorage.setItem('citizen-portal-user', JSON.stringify(newUser))
      setLoading(false)
      return { success: true }
    }
    setLoading(false)
    return { success: false, error: 'Please enter a username and password.' }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('citizen-portal-user')
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
