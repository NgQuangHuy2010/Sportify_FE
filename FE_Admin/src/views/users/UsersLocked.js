import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
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
  CAvatar,
  CSpinner,
} from '@coreui/react'
import { fetchLockedUsers, toggleUserLock } from '../../services/userService'

const UserList = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const pageSize = 20

  // Fetch dữ liệu từ API
  const fetchUsers = async (page) => {
    setLoading(true)
    const data = await fetchLockedUsers(page, pageSize)
    if (data) {
      setUsers(data.content)
      setTotalPages(data.totalPages)
    }
    setLoading(false)
  }

  // Gọi fetchUsers khi component render hoặc khi currentPage thay đổi
  useEffect(() => {
    fetchUsers(currentPage)
  }, [currentPage])

  // Xử lý chuyển trang
  const handlePageClick = (event) => {
    setCurrentPage(event.selected)
  }

  // Xử lý xem chi tiết
  const handleViewDetail = (id) => {
    navigate(`/user/detail/${id}`)
  }

  const handleToggleLock = async (id) => {
    const success = await toggleUserLock(id)
    if (success) loadUsers(currentPage)
  }

  return (
    <CCard className="mt-4">
      <CCardHeader>
        <h5>Locked Users List</h5>
      </CCardHeader>
      <CCardBody>
        {loading ? (
          <CSpinner color="primary" />
        ) : (
          <>
            <CTable striped hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>#</CTableHeaderCell>
                  <CTableHeaderCell>Avatar</CTableHeaderCell>
                  <CTableHeaderCell>Full Name</CTableHeaderCell>
                  <CTableHeaderCell>Email</CTableHeaderCell>
                  <CTableHeaderCell>Birthday</CTableHeaderCell>
                  <CTableHeaderCell>Phone</CTableHeaderCell>
                  <CTableHeaderCell>Gender</CTableHeaderCell>
                  <CTableHeaderCell>Status</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {users.map((user) => (
                  <CTableRow key={user.id}>
                    <CTableDataCell>{user.id}</CTableDataCell>
                    <CTableDataCell>
                      <CAvatar src={user.avatar} size="md" />
                    </CTableDataCell>
                    <CTableDataCell>{`${user.firstname} ${user.lastname}`}</CTableDataCell>
                    <CTableDataCell>{user.email}</CTableDataCell>
                    <CTableDataCell>{user.birthday}</CTableDataCell>
                    <CTableDataCell>{user.phone}</CTableDataCell>
                    <CTableDataCell>{user.gender}</CTableDataCell>
                    <CTableDataCell>
                      {user.locked ? (
                        <span className="text-danger">Locked</span>
                      ) : (
                        <span className="text-success">Active</span>
                      )}
                    </CTableDataCell>
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
                        color={user.locked ? 'success' : 'danger'}
                        size="sm"
                        onClick={() => handleToggleLock(user.id)}
                      >
                        {user.locked ? 'Unlock' : 'Lock'}
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>

            {/* Phân trang */}
            <ReactPaginate
              previousLabel={'Previous'}
              nextLabel={'Next'}
              breakLabel={'...'}
              pageCount={totalPages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={'pagination justify-content-center'}
              pageClassName={'page-item'}
              pageLinkClassName={'page-link'}
              previousClassName={'page-item'}
              previousLinkClassName={'page-link'}
              nextClassName={'page-item'}
              nextLinkClassName={'page-link'}
              breakClassName={'page-item'}
              breakLinkClassName={'page-link'}
              activeClassName={'active'}
              forcePage={currentPage}
            />
          </>
        )}
      </CCardBody>
    </CCard>
  )
}

export default UserList
