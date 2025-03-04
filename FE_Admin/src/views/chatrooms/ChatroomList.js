import React, { useState } from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CFormInput,
  CForm,
} from '@coreui/react'

const ChatroomList = () => {
  const [chatrooms, setChatrooms] = useState([
    { id: 1, name: 'Football Fans', isGroup: true, memberCount: 15 },
    { id: 2, name: 'Tennis Talk', isGroup: true, memberCount: 8 },
    { id: 3, name: 'John & Alice', isGroup: false, memberCount: 2 },
  ])
  const [search, setSearch] = useState('')

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }

  const handleViewDetails = (id) => {
    alert(`View details of chatroom ID: ${id}`)
  }

  const handleEdit = (id) => {
    alert(`Edit chatroom ID: ${id}`)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this chatroom?')) {
      setChatrooms(chatrooms.filter((room) => room.id !== id))
    }
  }

  const filteredChatrooms = chatrooms.filter((room) =>
    room.name.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <CCard className="mt-4">
      <CCardHeader>
        <h5>Chatroom List</h5>
        <CForm className="d-flex">
          <CFormInput
            type="text"
            placeholder="Search chatrooms..."
            value={search}
            onChange={handleSearchChange}
            className="me-3"
          />
          <CButton color="primary">Create New</CButton>
        </CForm>
      </CCardHeader>
      <CCardBody>
        <CTable striped hover>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>#</CTableHeaderCell>
              <CTableHeaderCell>Room Name</CTableHeaderCell>
              <CTableHeaderCell>Type</CTableHeaderCell>
              <CTableHeaderCell>Members</CTableHeaderCell>
              <CTableHeaderCell>Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {filteredChatrooms.map((room, index) => (
              <CTableRow key={room.id}>
                <CTableDataCell>{index + 1}</CTableDataCell>
                <CTableDataCell>{room.name}</CTableDataCell>
                <CTableDataCell>{room.isGroup ? 'Group' : 'Private'}</CTableDataCell>
                <CTableDataCell>{room.memberCount}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="info"
                    size="sm"
                    className="me-2"
                    onClick={() => handleViewDetails(room.id)}
                  >
                    View Details
                  </CButton>
                  <CButton
                    color="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(room.id)}
                  >
                    Edit
                  </CButton>
                  <CButton color="danger" size="sm" onClick={() => handleDelete(room.id)}>
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

export default ChatroomList
