import axios from 'axios'

const refreshToken = async () => {
  const refresh_token = localStorage.getItem('refresh')
  try {
    const res = await axios.post(
      'http://127.0.0.1:8000/api/users/token/refresh/',
      {
        refresh_token,
      },
    )
    const access = res.data.access
    localStorage.setItem('access', access)
    return access
  } catch (error) {
    localStorage.clear()
    throw error.response
  }
}

let refreshTokenRequest = null

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
})

instance.interceptors.request.use(
  (config) => {
    const access = localStorage.getItem('access')
    if (access) {
      config.headers.Authorization = `Bearer ${access}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

instance.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    if (error.response.status === 401) {
      refreshTokenRequest = refreshTokenRequest
        ? refreshTokenRequest
        : refreshToken().finally(() => {
            refreshTokenRequest = null
          })
      try {
        const access = await refreshTokenRequest
        return instance(error.response.config)
      } catch (refreshTokenError) {
        throw refreshTokenError
      }
    }
    return Promise.reject(error)
  },
)

export const Http = {
  get: (url) => instance.get(url),
  post: (url, body) => instance.post(url, body),
  update: (url, body) => instance.put(url, body),
  delete: (url) => instance.delete(url),
}
