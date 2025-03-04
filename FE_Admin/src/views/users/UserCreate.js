import React, { useState } from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CForm,
  CFormInput,
  CFormLabel,
  CButton,
  CFormSelect,
  CFormCheck,
  CRow,
  CCol,
} from '@coreui/react'

const UserCreate = () => {
  // Dữ liệu mẫu cho các môn thể thao
  const sportsList = [
    { id: 1, name: 'Football' },
    { id: 2, name: 'Basketball' },
    { id: 3, name: 'Tennis' },
    { id: 4, name: 'Cricket' },
  ]

  // State lưu trữ dữ liệu của người dùng
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: '',
    registrationMethod: '',
    birthday: '',
    phone: '',
    avatar: '',
    bio: '',
    isLocked: false,
    address: {
      city: '',
      district: '',
      no: '',
    },
    sports: [],
  })

  // Xử lý khi thay đổi giá trị trong form
  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'isLocked') {
      setFormData({
        ...formData,
        [name]: e.target.checked,
      })
    } else if (name.includes('address')) {
      const addressField = name.split('.')[1]
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [addressField]: value,
        },
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  // Xử lý thay đổi môn thể thao (multiple choice)
  const handleSportChange = (e) => {
    const selectedSports = [...formData.sports]
    if (e.target.checked) {
      selectedSports.push(parseInt(e.target.value))
    } else {
      const index = selectedSports.indexOf(parseInt(e.target.value))
      if (index > -1) {
        selectedSports.splice(index, 1)
      }
    }
    setFormData({
      ...formData,
      sports: selectedSports,
    })
  }

  // Xử lý khi submit form
  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate đơn giản
    if (
      !formData.firstname ||
      !formData.lastname ||
      !formData.email ||
      !formData.username ||
      !formData.password
    ) {
      alert('Please fill out all required fields')
      return
    }

    // Hiển thị dữ liệu trong console hoặc gọi API
    console.log('User Data Submitted:', formData)

    // Reset form
    setFormData({
      firstname: '',
      lastname: '',
      email: '',
      username: '',
      password: '',
      registrationMethod: '',
      birthday: '',
      phone: '',
      avatar: '',
      bio: '',
      isLocked: false,
      address: {
        city: '',
        district: '',
        no: '',
      },
      sports: [],
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
          {/* First Name Input */}
          <div className="mb-3">
            <CFormLabel htmlFor="firstname">First Name</CFormLabel>
            <CFormInput
              type="text"
              id="firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              placeholder="Enter user's first name"
              required
            />
          </div>

          {/* Last Name Input */}
          <div className="mb-3">
            <CFormLabel htmlFor="lastname">Last Name</CFormLabel>
            <CFormInput
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              placeholder="Enter user's last name"
              required
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
              required
            />
          </div>

          {/* Username Input */}
          <div className="mb-3">
            <CFormLabel htmlFor="username">Username</CFormLabel>
            <CFormInput
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter user's username"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-3">
            <CFormLabel htmlFor="password">Password</CFormLabel>
            <CFormInput
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter user's password"
              required
            />
          </div>

          {/* Registration Method Input */}
          <div className="mb-3">
            <CFormLabel htmlFor="registrationMethod">Registration Method</CFormLabel>
            <CFormSelect
              id="registrationMethod"
              name="registrationMethod"
              value={formData.registrationMethod}
              onChange={handleChange}
              required
            >
              <option value="">Select method</option>
              <option value="email">Email</option>
              <option value="google">Google</option>
              <option value="facebook">Facebook</option>
            </CFormSelect>
          </div>

          {/* Birthday Input */}
          <div className="mb-3">
            <CFormLabel htmlFor="birthday">Birthday</CFormLabel>
            <CFormInput
              type="date"
              id="birthday"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
            />
          </div>

          {/* Phone Input */}
          <div className="mb-3">
            <CFormLabel htmlFor="phone">Phone</CFormLabel>
            <CFormInput
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter user's phone number"
            />
          </div>

          {/* Avatar Input */}
          <div className="mb-3">
            <CFormLabel htmlFor="avatar">Avatar URL</CFormLabel>
            <CFormInput
              type="text"
              id="avatar"
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
              placeholder="Enter avatar URL"
            />
          </div>

          {/* Bio Input */}
          <div className="mb-3">
            <CFormLabel htmlFor="bio">Bio</CFormLabel>
            <CFormInput
              type="text"
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Enter bio"
            />
          </div>

          {/* Is Locked Checkbox */}
          <div className="mb-3">
            <CFormCheck
              type="checkbox"
              id="isLocked"
              name="isLocked"
              checked={formData.isLocked}
              onChange={handleChange}
              label="Is User Locked?"
            />
          </div>

          {/* Address Inputs */}
          <CRow>
            <CCol md="4">
              <div className="mb-3">
                <CFormLabel htmlFor="city">City</CFormLabel>
                <CFormInput
                  type="text"
                  id="city"
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleChange}
                />
              </div>
            </CCol>
            <CCol md="4">
              <div className="mb-3">
                <CFormLabel htmlFor="district">District</CFormLabel>
                <CFormInput
                  type="text"
                  id="district"
                  name="address.district"
                  value={formData.address.district}
                  onChange={handleChange}
                />
              </div>
            </CCol>
            <CCol md="4">
              <div className="mb-3">
                <CFormLabel htmlFor="no">Street No</CFormLabel>
                <CFormInput
                  type="text"
                  id="no"
                  name="address.no"
                  value={formData.address.no}
                  onChange={handleChange}
                />
              </div>
            </CCol>
          </CRow>

          {/* Sports Selection (Multiple Choice) */}
          <div className="mb-3">
            <CFormLabel>Sports</CFormLabel>
            {sportsList.map((sport) => (
              <CFormCheck
                key={sport.id}
                type="checkbox"
                id={`sport-${sport.id}`}
                name="sports"
                value={sport.id}
                checked={formData.sports.includes(sport.id)}
                onChange={handleSportChange}
                label={sport.name}
              />
            ))}
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
