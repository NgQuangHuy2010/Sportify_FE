import axios from 'axios'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const fetchUsers = async (page, search = '', pageSize = 20) => {
  try {
    const apiUrl = search
      ? `${API_BASE_URL}admin/users/search?name=${search}&page=${page}&size=${pageSize}`
      : `${API_BASE_URL}admin/users?page=${page}&size=${pageSize}`

    const response = await axios.get(apiUrl)
    return response.data
  } catch (error) {
    console.error('Error fetching users:', error)
    return null
  }
}

export const toggleUserLock = async (id) => {
  try {
    await axios.patch(`${API_BASE_URL}admin/users/${id}/toggle-lock`)
    return true
  } catch (error) {
    console.error('Error toggling user lock:', error)
    return false
  }
}

export const fetchUserDetail = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}admin/users/${userId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching user details:', error)
    return null
  }
}

export const fetchLockedUsers = async (page, size) => {
  try {
    const response = await axios.get(`${API_BASE_URL}admin/users/locked?page=${page}&size=${size}`)
    return response.data
  } catch (error) {
    console.error('Error fetching locked users:', error)
    return null
  }
}
