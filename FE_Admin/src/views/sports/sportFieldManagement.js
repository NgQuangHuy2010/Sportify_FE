import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
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
  CFormSelect,
} from '@coreui/react'

const SportFieldManagement = () => {
  const { sportsCenterId } = useParams()
  const [sportFields, setSportFields] = useState([])
  const [newSportField, setNewSportField] = useState({
    name: '',
    type: '',
    size: '',
    pricePerHour: '',
    isAvailable: true,
  })

  useEffect(() => {
    fetch(`http://localhost:8080/api/admin/sports-fields/center/${sportsCenterId}`)
      .then((response) => response.json())
      .then((data) => setSportFields(data))
      .catch((error) => console.error('Error fetching data:', error))
  }, [sportsCenterId])

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewSportField((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:8080/api/admin/sports-fields', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newSportField, sportsCenterId: parseInt(sportsCenterId) }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSportFields((prev) => [...prev, data])
        setNewSportField({ name: '', type: '', size: '', pricePerHour: '', isAvailable: true })
      })
      .catch((error) => console.error('Error adding sport field:', error))
  }

  return (
    <div className="container mt-4">
      <CCard>
        <CCardHeader>Sport Field Management</CCardHeader>
        <CCardBody>
          <CForm onSubmit={handleSubmit}>
            <CRow>
              <CCol md="3">
                <CFormInput
                  type="text"
                  name="name"
                  value={newSportField.name}
                  onChange={handleChange}
                  placeholder="Field Name"
                  required
                />
              </CCol>
              <CCol md="3">
                <CFormInput
                  type="text"
                  name="type"
                  value={newSportField.type}
                  onChange={handleChange}
                  placeholder="Type"
                  required
                />
              </CCol>
              <CCol md="2">
                <CFormInput
                  type="text"
                  name="size"
                  value={newSportField.size}
                  onChange={handleChange}
                  placeholder="Size"
                  required
                />
              </CCol>
              <CCol md="2">
                <CFormInput
                  type="number"
                  name="pricePerHour"
                  value={newSportField.pricePerHour}
                  onChange={handleChange}
                  placeholder="Price/Hour"
                  required
                />
              </CCol>
              <CCol md="2">
                <CFormSelect
                  name="isAvailable"
                  value={newSportField.isAvailable}
                  onChange={handleChange}
                >
                  <option value={true}>Available</option>
                  <option value={false}>Unavailable</option>
                </CFormSelect>
              </CCol>
            </CRow>
            <CButton color="primary" type="submit" className="mt-3">
              Add Sport Field
            </CButton>
          </CForm>
        </CCardBody>
      </CCard>

      <CCard className="mt-4">
        <CCardHeader>Sport Fields List</CCardHeader>
        <CCardBody>
          <CTable striped>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>ID</CTableHeaderCell>
                <CTableHeaderCell>Name</CTableHeaderCell>
                <CTableHeaderCell>Type</CTableHeaderCell>
                <CTableHeaderCell>Size</CTableHeaderCell>
                <CTableHeaderCell>Price/Hour</CTableHeaderCell>
                <CTableHeaderCell>Availability</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {sportFields.map((field) => (
                <CTableRow key={field.id}>
                  <CTableDataCell>{field.id}</CTableDataCell>
                  <CTableDataCell>{field.name}</CTableDataCell>
                  <CTableDataCell>{field.type}</CTableDataCell>
                  <CTableDataCell>{field.size}</CTableDataCell>
                  <CTableDataCell>{field.pricePerHour} VND </CTableDataCell>
                  <CTableDataCell>{field.isAvailable ? 'Yes' : 'No'}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default SportFieldManagement
