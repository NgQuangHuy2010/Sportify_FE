const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const getUserStatistics = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}admin/dashboard/user-statistics`)
    if (!response.ok) throw new Error('Failed to fetch user statistics')
    return await response.json()
  } catch (error) {
    console.error('Error fetching user statistics:', error)
    return null
  }
}

export const getUsersByMonth = async (year) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}admin/dashboard/statistics/users-by-month?year=${year}`,
    )
    if (!response.ok) throw new Error('Failed to fetch users by month')
    return await response.json()
  } catch (error) {
    console.error('Error fetching users by month:', error)
    return null
  }
}
