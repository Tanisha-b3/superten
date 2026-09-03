const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

class ApiClient {
  constructor() {
    this.baseUrl = BASE_URL
  }

  getToken() {
    try {
      // Check direct jwt_token first
      const token = localStorage.getItem('jwt_token')
      if (token) return token

      // Fallback to legacy or composite storage
      const stored = localStorage.getItem('citizen-portal-user')
      if (stored) {
        const parsed = JSON.parse(stored)
        return parsed.token || null
      }
    } catch {
      return null
    }
    return null
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`
    const token = this.getToken()

    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const config = {
      ...options,
      headers,
    }

    if (options.body && typeof options.body === 'object') {
      config.body = JSON.stringify(options.body)
    }

    try {
      const response = await fetch(url, config)

      // Handle 401 — token expired or invalid (except on login / auth endpoints)
      if (response.status === 401 && !endpoint.includes('/auth/login')) {
        localStorage.removeItem('jwt_token')
        localStorage.removeItem('user_info')
        localStorage.removeItem('citizen-portal-user')
        window.location.href = '/login'
        return { success: false, message: 'Session expired. Please login again.', error: 'Session expired. Please login again.' }
      }

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        const errorMsg = data.message || data.error || `Request failed with status ${response.status}`
        return {
          success: false,
          message: errorMsg,
          error: errorMsg,
          data,
        }
      }

      return {
        success: data.success !== undefined ? data.success : true,
        message: data.message || 'Operation successful',
        data: data.data !== undefined ? data.data : data,
        ...data,
      }
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        return {
          success: false,
          message: 'Unable to connect to the backend server at ' + this.baseUrl + '. Please make sure the Spring Boot application is running.',
          error: 'Connection refused',
        }
      }
      return {
        success: false,
        message: error.message || 'An unexpected error occurred.',
        error: error.message || 'Unknown error',
      }
    }
  }

  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' })
  }

  post(endpoint, body, options = {}) {
    return this.request(endpoint, { ...options, method: 'POST', body })
  }

  put(endpoint, body, options = {}) {
    return this.request(endpoint, { ...options, method: 'PUT', body })
  }

  delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' })
  }
}

const api = new ApiClient()
export default api
