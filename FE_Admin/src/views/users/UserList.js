// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import ReactPaginate from 'react-paginate'
// import {
//   CButton,
//   CTable,
//   CTableHead,
//   CTableRow,
//   CTableHeaderCell,
//   CTableBody,
//   CTableDataCell,
//   CCard,
//   CCardBody,
//   CCardHeader,
//   CAvatar,
//   CSpinner,
//   CFormInput,
// } from '@coreui/react'

// const UserList = () => {
//   const navigate = useNavigate()
//   const [users, setUsers] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [currentPage, setCurrentPage] = useState(0)
//   const [totalPages, setTotalPages] = useState(0)
//   const [searchTerm, setSearchTerm] = useState('')
//   const pageSize = 20

//   const fetchUsers = (page, search = '') => {
//     setLoading(true)
//     const apiUrl = search
//       ? `http://localhost:8080/api/admin/users/search?name=${search}&page=${page}&size=${pageSize}`
//       : `http://localhost:8080/api/admin/users?page=${page}&size=${pageSize}`

//     axios
//       .get(apiUrl)
//       .then((response) => {
//         setUsers(response.data.content)
//         setTotalPages(response.data.totalPages)
//         setLoading(false)
//       })
//       .catch((error) => {
//         console.error('Error fetching users:', error)
//         setLoading(false)
//       })
//   }

//   useEffect(() => {
//     fetchUsers(currentPage)
//   }, [currentPage])

//   const handlePageClick = (event) => {
//     setCurrentPage(event.selected)
//   }

//   // Xử lý xem chi tiết
//   const handleViewDetail = (id) => {
//     navigate(`/user/detail/${id}`)
//   }

//   const handleSearch = () => {
//     setCurrentPage(0)
//     fetchUsers(0, searchTerm)
//   }

//   const toggleLock = (id) => {
//     axios
//       .patch(`http://localhost:8080/api/admin/users/${id}/toggle-lock`)
//       .then(() => {
//         fetchUsers(currentPage, searchTerm)
//       })
//       .catch((error) => {
//         console.error('Error toggling user lock:', error)
//       })
//   }

//   return (
//     <CCard className="mt-4">
//       <CCardHeader>
//         <h5>User List</h5>
//         <div className="d-flex mt-2">
//           <CFormInput
//             type="text"
//             placeholder="Search by first name or last name"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <CButton color="primary" className="ms-2" onClick={handleSearch}>
//             Search
//           </CButton>
//         </div>
//       </CCardHeader>
//       <CCardBody>
//         {loading ? (
//           <CSpinner color="primary" />
//         ) : (
//           <>
//             <CTable striped hover responsive>
//               <CTableHead>
//                 <CTableRow>
//                   <CTableHeaderCell>#</CTableHeaderCell>
//                   <CTableHeaderCell>Avatar</CTableHeaderCell>
//                   <CTableHeaderCell>Full Name</CTableHeaderCell>
//                   <CTableHeaderCell>Email</CTableHeaderCell>
//                   <CTableHeaderCell>Birthday</CTableHeaderCell>
//                   {/* <CTableHeaderCell>Phone</CTableHeaderCell> */}
//                   <CTableHeaderCell>Gender</CTableHeaderCell>
//                   <CTableHeaderCell>Status</CTableHeaderCell>
//                   <CTableHeaderCell>Actions</CTableHeaderCell>
//                 </CTableRow>
//               </CTableHead>
//               <CTableBody>
//                 {users.map((user) => (
//                   <CTableRow key={user.id}>
//                     <CTableDataCell>{user.id}</CTableDataCell>
//                     <CTableDataCell>
//                       <CAvatar
//                         src={`http://localhost:8080/uploads/avatar/${user.avatar}`}
//                         size="md"
//                       />
//                     </CTableDataCell>
//                     <CTableDataCell>{`${user.firstname} ${user.lastname}`}</CTableDataCell>
//                     <CTableDataCell>{user.email}</CTableDataCell>
//                     <CTableDataCell>{user.birthday}</CTableDataCell>
//                     {/* <CTableDataCell>{user.phone}</CTableDataCell> */}
//                     <CTableDataCell>{user.gender}</CTableDataCell>
//                     <CTableDataCell>
//                       {user.locked ? (
//                         <span className="text-danger">Locked</span>
//                       ) : (
//                         <span className="text-success">Active</span>
//                       )}
//                     </CTableDataCell>
//                     <CTableDataCell>
//                       <CButton
//                         color="info"
//                         size="sm"
//                         className="me-2"
//                         onClick={() => handleViewDetail(user.id)}
//                       >
//                         View Detail
//                       </CButton>
//                       <CButton
//                         color={user.locked ? 'success' : 'danger'}
//                         size="sm"
//                         onClick={() => toggleLock(user.id)}
//                       >
//                         {user.locked ? 'Unlock' : 'Lock'}
//                       </CButton>
//                     </CTableDataCell>
//                   </CTableRow>
//                 ))}
//               </CTableBody>
//             </CTable>

//             <ReactPaginate
//               previousLabel={'Previous'}
//               nextLabel={'Next'}
//               breakLabel={'...'}
//               pageCount={totalPages}
//               marginPagesDisplayed={2}
//               pageRangeDisplayed={5}
//               onPageChange={handlePageClick}
//               containerClassName={'pagination justify-content-center'}
//               pageClassName={'page-item'}
//               pageLinkClassName={'page-link'}
//               previousClassName={'page-item'}
//               previousLinkClassName={'page-link'}
//               nextClassName={'page-item'}
//               nextLinkClassName={'page-link'}
//               breakClassName={'page-item'}
//               breakLinkClassName={'page-link'}
//               activeClassName={'active'}
//               forcePage={currentPage}
//             />
//           </>
//         )}
//       </CCardBody>
//     </CCard>
//   )
// }

// export default UserList

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import { fetchUsers, toggleUserLock } from '../../services/userService'
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
  CFormInput,
} from '@coreui/react'

const UserList = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const pageSize = 20

  useEffect(() => {
    loadUsers(currentPage)
  }, [currentPage])

  const loadUsers = async (page) => {
    setLoading(true)
    const data = await fetchUsers(page, searchTerm, pageSize)
    if (data) {
      setUsers(data.content)
      setTotalPages(data.totalPages)
    }
    setLoading(false)
  }

  const handlePageClick = (event) => {
    setCurrentPage(event.selected)
  }

  const handleViewDetail = (id) => {
    navigate(`/user/detail/${id}`)
  }

  const handleSearch = () => {
    setCurrentPage(0)
    loadUsers(0)
  }

  const handleToggleLock = async (id) => {
    const success = await toggleUserLock(id)
    if (success) loadUsers(currentPage)
  }

  return (
    <CCard className="mt-4">
      <CCardHeader>
        <h5>User List</h5>
        <div className="d-flex mt-2">
          <CFormInput
            type="text"
            placeholder="Search by first name or last name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <CButton color="primary" className="ms-2" onClick={handleSearch}>
            Search
          </CButton>
        </div>
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
                      <CAvatar
                        src={`${import.meta.env.VITE_PATH_IMAGE}avatar/${user.avatar}`}
                        size="md"
                      />
                    </CTableDataCell>
                    <CTableDataCell>{`${user.firstname} ${user.lastname}`}</CTableDataCell>
                    <CTableDataCell>{user.email}</CTableDataCell>
                    <CTableDataCell>{user.birthday}</CTableDataCell>
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
