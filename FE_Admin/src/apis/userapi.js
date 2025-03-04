import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api' // Địa chỉ API gốc
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // Thời gian chờ
})

// API: Lấy danh sách người dùng
export const fetchUsersApi = (page, pageSize) => {
  return apiClient.get(`/admin/users`, {
    params: { page, size: pageSize },
  })
}
