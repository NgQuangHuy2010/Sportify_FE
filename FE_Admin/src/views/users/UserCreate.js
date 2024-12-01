import React, { useState } from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CForm,
  CFormInput,
  CButton,
  CFormLabel,
} from '@coreui/react'

const UserCreate = () => {
  // State lưu trữ dữ liệu của người dùng
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
  })

  // Xử lý khi thay đổi giá trị trong form
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Xử lý khi submit form
  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate đơn giản
    if (!formData.name || !formData.email || !formData.age) {
      alert('Please fill out all fields')
      return
    }

    // Hiển thị dữ liệu trong console hoặc gọi API
    console.log('User Data Submitted:', formData)

    // Reset form
    setFormData({
      name: '',
      email: '',
      age: '',
    })

    alert('User added successfully!')
  }

  return (
    <CCard className="mt-4">
      <CCardHeader>
        <h5>Create New User</h5>
      </CCardHeader>
      <CCardBody>
        <CForm onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="mb-3">
            <CFormLabel htmlFor="name">Name</CFormLabel>
            <CFormInput
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter user's name"
            />
          </div>

          {/* Email Input */}
          <div className="mb-3">
            <CFormLabel htmlFor="email">Email</CFormLabel>
            <CFormInput
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter user's email"
            />
          </div>

          {/* Age Input */}
          <div className="mb-3">
            <CFormLabel htmlFor="age">Age</CFormLabel>
            <CFormInput
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter user's age"
            />
          </div>

          {/* Submit Button */}
          <CButton color="primary" type="submit">
            Submit
          </CButton>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default UserCreate
