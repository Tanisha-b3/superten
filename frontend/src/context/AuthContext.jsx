import { createContext, useContext, useState, useEffect } from 'react'
import authService from '../services/authService'

const AuthContext = createContext(null)

function getInitialAuth() {
  try {
    const token = localStorage.getItem('jwt_token')
    const storedUser = localStorage.getItem('user_info')
    const user = storedUser ? JSON.parse(storedUser) : null
    return { token, user }
  } catch {
    return { token: null, user: null }
  }
}

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(getInitialAuth)
  const [loading, setLoading] = useState(false)

  const { user, token } = authState
  const isAuthenticated = Boolean(token && user)

  // Login action
  const login = async (username, password, captchaToken = 'dev-captcha-passed') => {
    setLoading(true)
    try {
      const result = await authService.login(username, password, captchaToken)

      if (result.success && result.data) {
        const receivedToken = result.data.token || (typeof result.data === 'string' ? result.data : null)
        const receivedUser = result.data.user || {
          id: result.data.id || 1,
          username: result.data.username || username,
          email: result.data.email || '',
          role: result.data.role || 'ROLE_CITIZEN',
        }

        if (receivedToken) {
          localStorage.setItem('jwt_token', receivedToken)
          localStorage.setItem('user_info', JSON.stringify(receivedUser))
          // For backward compatibility:
          localStorage.setItem('citizen-portal-user', JSON.stringify({ ...receivedUser, token: receivedToken }))

          setAuthState({ token: receivedToken, user: receivedUser })
          setLoading(false)
          return { success: true, message: result.message || 'Login successful', data: result.data }
        }
      }

      setLoading(false)
      return {
        success: false,
        message: result.message || result.error || 'Invalid username or password',
        error: result.message || result.error || 'Invalid username or password',
      }
    } catch (err) {
      setLoading(false)
      return {
        success: false,
        message: err.message || 'Network error occurred during login',
        error: err.message,
      }
    }
  }

  // Forgot Password action
  const forgotPassword = async (usernameOrEmail) => {
    setLoading(true)
    try {
      const result = await authService.forgotPassword(usernameOrEmail)
      setLoading(false)
      return result
    } catch (err) {
      setLoading(false)
      return { success: false, message: err.message || 'Error requesting reset token' }
    }
  }

  // Reset Password action
  const resetPassword = async (resetToken, newPassword) => {
    setLoading(true)
    try {
      const result = await authService.resetPassword(resetToken, newPassword)
      setLoading(false)
      return result
    } catch (err) {
      setLoading(false)
      return { success: false, message: err.message || 'Error resetting password' }
    }
  }

  // Direct Password Change (no manual token)
  const changePasswordDirect = async (identifier, newPassword) => {
    setLoading(true)
    try {
      const result = await authService.changePasswordDirect(identifier, newPassword)
      setLoading(false)
      return result
    } catch (err) {
      setLoading(false)
      return { success: false, message: err.message || 'Error updating password' }
    }
  }

  // Logout action
  const logout = async () => {
    try {
      await authService.logout().catch(() => {})
    } finally {
      localStorage.removeItem('jwt_token')
      localStorage.removeItem('user_info')
      localStorage.removeItem('citizen-portal-user')
      setAuthState({ token: null, user: null })
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loading,
        login,
        logout,
        forgotPassword,
        resetPassword,
        changePasswordDirect,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
