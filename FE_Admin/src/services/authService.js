import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const login = async (usernameOrEmail, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}auth/login`, { usernameOrEmail, password })
    return response.data // Trả về { token: '...' }
  } catch (error) {
    console.error('Login failed:', error)
    return null
  }
}

// Hàm decode JWT
const decodeToken = (token) => {
  try {
    const payload = token.split('.')[1] // Lấy phần payload (giữa 2 dấu '.')
    const decoded = JSON.parse(atob(payload)) // Giải mã base64
    console.log(decoded)
    return decoded
  } catch (error) {
    console.error('Invalid token:', error)
    return null
  }
}

// Kiểm tra nếu user có quyền admin (sub bắt đầu bằng 'admin')
export const isAdminUser = (token) => {
  const decodedToken = decodeToken(token)
  console.log('CHECK ANDMIN: ', decodedToken?.sub?.startsWith('admin') || false)
  return decodedToken?.sub?.startsWith('admin') || false
}

// Hàm logout
export const logout = () => {
  localStorage.removeItem('jwtToken') // Xóa token khỏi localStorage
  window.location.href = '/login' // Chuyển hướng về trang login
}
