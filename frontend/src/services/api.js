import axios from 'axios'

// An explicit VITE_API_URL always wins. Otherwise: same-origin `/api` in production builds
// (proxied to the backend by the web server), and the local backend during development.
const defaultBaseURL = import.meta.env.PROD ? '/api' : 'http://localhost:5000/api'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || defaultBaseURL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message || error.message || 'Something went wrong. Please try again.'
    return Promise.reject(new Error(message))
  }
)

export default api
