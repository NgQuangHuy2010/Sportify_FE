import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CCard,
  CCardBody,
  CCardHeader,
} from '@coreui/react'

const UserList = () => {
  // Danh sách người dùng (mock data)
  const navigate = useNavigate() // Hook điều hướng
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', age: 28 },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', age: 34 },
    { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com', age: 25 },
  ])

  // Xử lý thêm mới
  const handleAddNew = () => {
    alert('Navigate to Add New User Page')
    navigate('/user/create')
  }

  // Xử lý xem chi tiết
  const handleViewDetail = (id) => {
    alert(`View details of user ID: ${id}`)
  }

  // Xử lý chỉnh sửa
  const handleEdit = (id) => {
    alert(`Edit user ID: ${id}`)
  }

  // Xử lý xóa
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter((user) => user.id !== id))
    }
  }

  return (
    <CCard className="mt-4">
      <CCardHeader>
        <h5>User List</h5>
        <CButton color="primary" onClick={handleAddNew}>
          Add New
        </CButton>
      </CCardHeader>
      <CCardBody>
        <CTable striped hover>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>#</CTableHeaderCell>
              <CTableHeaderCell>Name</CTableHeaderCell>
              <CTableHeaderCell>Email</CTableHeaderCell>
              <CTableHeaderCell>Age</CTableHeaderCell>
              <CTableHeaderCell>Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {users.map((user, index) => (
              <CTableRow key={user.id}>
                <CTableDataCell>{index + 1}</CTableDataCell>
                <CTableDataCell>{user.name}</CTableDataCell>
                <CTableDataCell>{user.email}</CTableDataCell>
                <CTableDataCell>{user.age}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="info"
                    size="sm"
                    className="me-2"
                    onClick={() => handleViewDetail(user.id)}
                  >
                    View Detail
                  </CButton>
                  <CButton
                    color="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(user.id)}
                  >
                    Edit
                  </CButton>
                  <CButton color="danger" size="sm" onClick={() => handleDelete(user.id)}>
                    Delete
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  )
}

export default UserList
