import api from './api'

const authService = {
  /**
   * 1. User Login
   * POST /api/auth/login
   * @param {string} username 
   * @param {string} password 
   * @param {string} captchaToken 
   */
  login: (username, password, captchaToken = 'dev-captcha-passed') => {
    return api.post('/auth/login', {
      username,
      password,
      captchaToken,
    })
  },

  /**
   * 2. Direct Password Change (No manual token step)
   * Automatically changes password directly or chains token handover invisibly
   * @param {string} identifier (email or username)
   * @param {string} newPassword 
   */
  changePasswordDirect: async (identifier, newPassword) => {
    const trimmed = String(identifier || '').trim()
    const payload = trimmed.includes('@')
      ? { email: trimmed, usernameOrEmail: trimmed, newPassword }
      : { username: trimmed, usernameOrEmail: trimmed, newPassword }

    // Step 1: Request token / direct reset from backend
    const forgotRes = await api.post('/auth/forgot-password', payload)

    // If backend directly changed password on forgot-password endpoint
    if (forgotRes.success && !forgotRes.resetToken && !forgotRes.data?.resetToken) {
      return {
        success: true,
        message: forgotRes.message || 'Password has been updated successfully.',
      }
    }

    // If backend returns a reset token, immediately reset password with token under the hood
    const token = forgotRes.resetToken || forgotRes.data?.resetToken

    if (token) {
      const resetRes = await api.post('/auth/reset-password', {
        token,
        newPassword,
      })

      if (resetRes.success) {
        return {
          success: true,
          message: resetRes.message || 'Password has been reset successfully. You can now login.',
        }
      }
      return {
        success: false,
        message: resetRes.message || resetRes.error || 'Failed to update password with generated token.',
      }
    }

    if (!forgotRes.success) {
      return {
        success: false,
        message: forgotRes.message || forgotRes.error || 'User not found or unable to reset password.',
      }
    }

    return forgotRes
  },

  /**
   * Forgot Password (Request Reset Token)
   * POST /api/auth/forgot-password
   * @param {string|object} input 
   */
  forgotPassword: (input) => {
    if (typeof input === 'object' && input !== null) {
      return api.post('/auth/forgot-password', input)
    }

    const trimmed = String(input || '').trim()
    const payload = trimmed.includes('@')
      ? { email: trimmed, usernameOrEmail: trimmed }
      : { username: trimmed, usernameOrEmail: trimmed }

    return api.post('/auth/forgot-password', payload)
  },

  /**
   * Reset Password (Set New Password with Token)
   * POST /api/auth/reset-password
   * @param {string} token 
   * @param {string} newPassword 
   */
  resetPassword: (token, newPassword) => {
    return api.post('/auth/reset-password', {
      token,
      newPassword,
    })
  },

  /**
   * Logout
   * POST /api/auth/logout
   */
  logout: () => {
    return api.post('/auth/logout')
  },

  /**
   * Protected profile helper
   * GET /api/citizen/profile
   */
  getProfile: () => {
    return api.get('/citizen/profile')
  },
}

export default authService
