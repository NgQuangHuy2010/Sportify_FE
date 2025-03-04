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
  CPagination,
  CPaginationItem,
} from '@coreui/react'

const ChatroomMessages = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'John Doe', message: 'Hello everyone!', timestamp: '2024-12-30 10:00:00' },
    { id: 2, sender: 'Jane Smith', message: 'Hi John!', timestamp: '2024-12-30 10:05:00' },
    { id: 3, sender: 'Alice Johnson', message: 'Good morning!', timestamp: '2024-12-30 10:10:00' },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const messagesPerPage = 10

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      setMessages(messages.filter((message) => message.id !== id))
    }
  }

  const filteredMessages = messages.filter(
    (message) =>
      message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const indexOfLastMessage = currentPage * messagesPerPage
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage
  const currentMessages = filteredMessages.slice(indexOfFirstMessage, indexOfLastMessage)

  const totalPages = Math.ceil(filteredMessages.length / messagesPerPage)

  return (
    <CCard className="mt-4">
      <CCardHeader>
        <h5>Chatroom Messages</h5>
        <CFormInput
          type="text"
          placeholder="Search messages by sender or content"
          value={searchTerm}
          onChange={handleSearch}
          className="mt-2"
        />
      </CCardHeader>
      <CCardBody>
        <CTable striped hover>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>#</CTableHeaderCell>
              <CTableHeaderCell>Sender</CTableHeaderCell>
              <CTableHeaderCell>Message</CTableHeaderCell>
              <CTableHeaderCell>Timestamp</CTableHeaderCell>
              <CTableHeaderCell>Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {currentMessages.map((message, index) => (
              <CTableRow key={message.id}>
                <CTableDataCell>{indexOfFirstMessage + index + 1}</CTableDataCell>
                <CTableDataCell>{message.sender}</CTableDataCell>
                <CTableDataCell>{message.message}</CTableDataCell>
                <CTableDataCell>{message.timestamp}</CTableDataCell>
                <CTableDataCell>
                  <CButton color="danger" size="sm" onClick={() => handleDelete(message.id)}>
                    Delete
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>

        <CPagination align="center" className="mt-3">
          <CPaginationItem
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </CPaginationItem>
          {Array.from({ length: totalPages }, (_, i) => (
            <CPaginationItem
              key={i}
              active={currentPage === i + 1}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </CPaginationItem>
          ))}
          <CPaginationItem
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </CPaginationItem>
        </CPagination>
      </CCardBody>
    </CCard>
  )
}

export default ChatroomMessages
