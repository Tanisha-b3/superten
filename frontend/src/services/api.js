const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`
  const config = {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  }

  try {
    const response = await fetch(url, config)
    const data = await response.json()
    if (!response.ok) {
      return { success: false, error: data.message || 'Request failed' }
    }
    return { success: true, data }
  } catch (error) {
    return { success: false, error: 'Unable to connect to the server. Please try again later.' }
  }
}

export const api = {
  get: (endpoint) => request(endpoint, { method: 'GET' }),
  post: (endpoint, body) => request(endpoint, { method: 'POST', body: JSON.stringify(body) }),
  put: (endpoint, body) => request(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
  delete: (endpoint) => request(endpoint, { method: 'DELETE' }),
}

export default api
