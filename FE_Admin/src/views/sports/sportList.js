import React, { useEffect, useState } from 'react'
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
import { fetchSports } from '../../services/sportService'

const SportList = () => {
  const navigate = useNavigate()
  const [sports, setSports] = useState([])

  // Fetch dữ liệu từ API
  useEffect(() => {
    const loadSports = async () => {
      const data = await fetchSports()
      setSports(data)
    }
    loadSports()
  }, [])

  // Xử lý thêm mới
  const handleAddNew = () => {
    navigate('/sports/create')
  }

  // Xử lý chỉnh sửa
  const handleEdit = (id) => {
    navigate(`/sports/edit/${id}`)
  }

  return (
    <CCard className="mt-4">
      <CCardHeader className="d-flex justify-content-between align-items-center">
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
              <CTableHeaderCell>Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {sports.map((sport) => (
              <CTableRow key={sport.id}>
                <CTableDataCell>{sport.id}</CTableDataCell>
                <CTableDataCell>{sport.sportName}</CTableDataCell>
                <CTableDataCell>
                  <img
                    src={`${import.meta.env.VITE_PATH_IMAGE}sports/${sport.image}`}
                    alt={sport.sportName}
                    style={{ width: '100px', height: 'auto' }}
                  />
                </CTableDataCell>
                <CTableDataCell>
                  <CButton color="warning" size="sm" onClick={() => handleEdit(sport.id)}>
                    Edit
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

export default SportList
