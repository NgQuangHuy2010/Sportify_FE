import React, { useEffect, useState } from 'react'
import axios from 'axios'
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

const SportList = () => {
  const navigate = useNavigate()
  const [sports, setSports] = useState([])

  // Fetch dữ liệu từ API
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/admin/sports')
      .then((response) => {
        console.log(response.data)
        setSports(response.data)
      })
      .catch((error) => {
        console.error('Error fetching sports data:', error)
      })
  }, [])

  // Xử lý thêm mới
  const handleAddNew = () => {
    navigate('/sports/create')
  }

  // Xử lý xem chi tiết
  const handleViewDetail = (id) => {
    alert(`View details of sport ID: ${id}`)
  }

  // Xử lý chỉnh sửa
  const handleEdit = (id) => {
    alert(`Edit sport ID: ${id}`)
  }

  // Xử lý xóa
  // const handleDelete = (id) => {
  //   if (window.confirm('Are you sure you want to delete this sport?')) {
  //     setSports(sports.filter((sport) => sport.id !== id))
  //   }
  // }

  return (
    <CCard className="mt-4">
      <CCardHeader>
        <h5>Sport List</h5>
        <CButton color="primary" onClick={handleAddNew}>
          Add New
        </CButton>
      </CCardHeader>
      <CCardBody>
        <CTable striped hover>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>#</CTableHeaderCell>
              <CTableHeaderCell>Sport Name</CTableHeaderCell>
              <CTableHeaderCell>Image</CTableHeaderCell>
              {/* <CTableHeaderCell>Actions</CTableHeaderCell> */}
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {sports.map((sport, index) => (
              <CTableRow key={sport.id}>
                <CTableDataCell>{sport.id}</CTableDataCell>
                <CTableDataCell>{sport.sportName}</CTableDataCell>
                <CTableDataCell>
                  <img
                    src={sport.imageUrl}
                    alt={sport.sportName}
                    style={{ width: '100px', height: 'auto' }}
                  />
                </CTableDataCell>
                {/* <CTableDataCell>
                  <CButton
                    color="info"
                    size="sm"
                    className="me-2"
                    onClick={() => handleViewDetail(sport.id)}
                  >
                    View Detail
                  </CButton>
                  <CButton
                    color="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(sport.id)}
                  >
                    Edit
                  </CButton>
                  <CButton color="danger" size="sm" onClick={() => handleDelete(sport.id)}>
                    Delete
                  </CButton>
                </CTableDataCell> */}
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  )
}

export default SportList
