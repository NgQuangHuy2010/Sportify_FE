import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CCol,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CForm,
  CFormTextarea,
  CFormInput,
} from '@coreui/react'

const FeedbackSupportManagement = () => {
  const [feedbacks, setFeedbacks] = useState([])
  const [newFeedback, setNewFeedback] = useState({
    user: '',
    message: '',
  })

  useEffect(() => {
    fetch('/api/admin/feedbacks')
      .then((response) => response.json())
      .then((data) => setFeedbacks(data))
      .catch((error) => console.error('Error fetching feedbacks:', error))
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewFeedback((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('/api/admin/feedbacks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFeedback),
    })
      .then((response) => response.json())
      .then((data) => {
        setFeedbacks((prev) => [...prev, data])
        setNewFeedback({ user: '', message: '' })
      })
      .catch((error) => console.error('Error adding feedback:', error))
  }

  return (
    <div className="container mt-4">
      <CCard>
        <CCardHeader>Feedback & Support Management</CCardHeader>
        <CCardBody>
          <CForm onSubmit={handleSubmit}>
            <CRow>
              <CCol md="4">
                <CFormInput
                  type="text"
                  name="user"
                  value={newFeedback.user}
                  onChange={handleChange}
                  placeholder="User Name"
                  required
                />
              </CCol>
              <CCol md="8">
                <CFormTextarea
                  name="message"
                  value={newFeedback.message}
                  onChange={handleChange}
                  placeholder="Enter feedback or support request"
                  rows={2}
                  required
                />
              </CCol>
            </CRow>
            <CButton color="primary" type="submit" className="mt-3">
              Submit Feedback
            </CButton>
          </CForm>
        </CCardBody>
      </CCard>

      <CCard className="mt-4">
        <CCardHeader>Feedback List</CCardHeader>
        <CCardBody>
          <CTable striped>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>ID</CTableHeaderCell>
                <CTableHeaderCell>User</CTableHeaderCell>
                <CTableHeaderCell>Message</CTableHeaderCell>
                <CTableHeaderCell>Date</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {feedbacks.map((feedback) => (
                <CTableRow key={feedback.id}>
                  <CTableDataCell>{feedback.id}</CTableDataCell>
                  <CTableDataCell>{feedback.user}</CTableDataCell>
                  <CTableDataCell>{feedback.message}</CTableDataCell>
                  <CTableDataCell>{new Date(feedback.date).toLocaleDateString()}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default FeedbackSupportManagement
