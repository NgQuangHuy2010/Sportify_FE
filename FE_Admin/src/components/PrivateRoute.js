import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem('jwtToken')

  if (!token) {
    console.log('No Token')
    return <Navigate to="/login" replace />
  }

  // Giải mã token để kiểm tra hạn (exp)
  const decodedToken = JSON.parse(atob(token.split('.')[1]))
  const currentTime = Date.now() / 1000
  console.log('Curent:  ', currentTime)
  console.log('Decode:  ', decodedToken)

  if (decodedToken.exp < currentTime) {
    localStorage.removeItem('jwtToken') // Xóa token hết hạn
    return <Navigate to="/login" replace />
  }

  return element
}

export default PrivateRoute
