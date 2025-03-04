import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CCard, CCardBody, CCardHeader, CButton, CRow, CCol } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilList, cilSearch, cilLockLocked } from '@coreui/icons'

const UserManagement = () => {
  const navigate = useNavigate()

  // Chuyển hướng đến trang danh sách người dùng
  const goToUserList = () => {
    navigate('/users-list')
  }

  // Chuyển hướng đến trang thêm mới người dùng
  const goToAddUser = () => {
    navigate('/user/create')
  }

  const goToSearch = () => {
    navigate('/user/search')
  }

  const goToLockedUsers = () => {
    navigate('/user/locked')
  }

  return (
    <CCard className="mt-4">
      <CCardHeader>
        <h4>Users Management</h4>
      </CCardHeader>
      <CCardBody>
        <CRow className="gap-3">
          <CCol xs={12} md={3}>
            <CButton color="primary" className="w-100" onClick={goToUserList}>
              <CIcon icon={cilList} className="me-2" /> User List
            </CButton>
          </CCol>
          <CCol xs={12} md={3}>
            <CButton color="success" className="w-100" onClick={goToAddUser}>
              <CIcon icon={cilPlus} className="me-2" /> Add New User
            </CButton>
          </CCol>
          <CCol xs={12} md={3}>
            <CButton color="info" className="w-100" onClick={goToSearch}>
              <CIcon icon={cilSearch} className="me-2" /> Search
            </CButton>
          </CCol>
          <CCol xs={12} md={3}>
            <CButton color="danger" className="w-100" onClick={goToLockedUsers}>
              <CIcon icon={cilLockLocked} className="me-2" /> Locked Users
            </CButton>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  )
}

export default UserManagement
