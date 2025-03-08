import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

// Lấy danh sách tất cả môn thể thao
export const fetchSports = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}admin/sports`)
    return response.data
  } catch (error) {
    console.error('Error fetching sports data:', error)
    return []
  }
}

// Lấy chi tiết môn thể thao
export const getSportById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}admin/sports/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching sport details:', error)
    return null
  }
}

// Tạo mới môn thể thao
export const createSport = async (sportName, image) => {
  const formData = new FormData()
  formData.append('sportName', sportName)
  if (image) {
    formData.append('image', image)
  }

  try {
    const response = await axios.post(`${API_BASE_URL}admin/sports`, formData)
    return response.data
  } catch (error) {
    console.error('Error creating sport:', error)
    return null
  }
}

// Cập nhật môn thể thao
export const updateSport = async (id, sportName, imageFile) => {
  const formData = new FormData()
  formData.append('sportName', sportName)
  if (imageFile) {
    formData.append('image', imageFile)
  }

  try {
    const response = await axios.put(`${API_BASE_URL}admin/sports/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response.data
  } catch (error) {
    console.error('Error updating sport:', error)
    return null
  }
}

export const deleteSport = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}admin/sports/${id}`)
    return true
  } catch (error) {
    console.error('Error deleting sport:', error)
    return false
  }
}
