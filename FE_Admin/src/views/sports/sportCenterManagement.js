import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CCol,
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CForm,
  CFormInput,
  CFormTextarea,
} from '@coreui/react'

const SportCenterManagement = () => {
  const [sportCenters, setSportCenters] = useState([])
  const [newSportCenter, setNewSportCenter] = useState({
    name: '',
    location: '',
    description: '',
  })
  const navigate = useNavigate()

  useEffect(() => {
    fetch('http://localhost:8080/api/admin/sports-centers')
      .then((response) => response.json())
      .then((data) => setSportCenters(data))
      .catch((error) => console.error('Error fetching data:', error))
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewSportCenter((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:8080/api/admin/sports-centers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newSportCenter),
    })
      .then((response) => response.json())
      .then((data) => {
        setSportCenters((prev) => [...prev, data])
        setNewSportCenter({ name: '', location: '', description: '' })
      })
      .catch((error) => console.error('Error adding sport center:', error))
  }

  const handleViewFields = (centerId) => {
    navigate(`/sports-fields/${centerId}`)
  }

  return (
    <div className="container mt-4">
      <CCard>
        <CCardHeader>Sport Center Management</CCardHeader>
        <CCardBody>
          <CForm onSubmit={handleSubmit}>
            <CRow>
              <CCol md="4">
                <CFormInput
                  type="text"
                  name="name"
                  value={newSportCenter.name}
                  onChange={handleChange}
                  placeholder="Sport Center Name"
                  required
                />
              </CCol>
              <CCol md="4">
                <CFormInput
                  type="text"
                  name="location"
                  value={newSportCenter.location}
                  onChange={handleChange}
                  placeholder="Location"
                  required
                />
              </CCol>
              <CCol md="4">
                <CFormTextarea
                  name="description"
                  value={newSportCenter.description}
                  onChange={handleChange}
                  placeholder="Description"
                  rows={1}
                  required
                />
              </CCol>
            </CRow>
            <CButton color="primary" type="submit" className="mt-3">
              Add Sport Center
            </CButton>
          </CForm>
        </CCardBody>
      </CCard>

      <CCard className="mt-4">
        <CCardHeader>Sport Centers List</CCardHeader>
        <CCardBody>
          <CTable striped>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>ID</CTableHeaderCell>
                <CTableHeaderCell>Name</CTableHeaderCell>
                <CTableHeaderCell>Location</CTableHeaderCell>
                <CTableHeaderCell>Description</CTableHeaderCell>
                <CTableHeaderCell>Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {sportCenters.map((center) => (
                <CTableRow key={center.id}>
                  <CTableDataCell>{center.id}</CTableDataCell>
                  <CTableDataCell>{center.name}</CTableDataCell>
                  <CTableDataCell>{center.location}</CTableDataCell>
                  <CTableDataCell>{center.description}</CTableDataCell>
                  <CTableDataCell>
                    <CButton color="info" onClick={() => handleViewFields(center.id)}>
                      View Fields
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default SportCenterManagement
