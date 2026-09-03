import api from './api'

export const authService = {
  login: async (username, password, captchaToken) => {
    return api.post('/auth/login', { username, password, captchaToken })
  },

  register: async (fullName, email, password) => {
    return api.post('/auth/register', { fullName, email, password })
  },

  logout: async () => {
    return api.post('/auth/logout')
  },

  getProfile: async () => {
    return api.get('/auth/profile')
  },
}

export default authService
