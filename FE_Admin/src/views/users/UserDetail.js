import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CRow,
  CCol,
  CAvatar,
  CSpinner,
} from '@coreui/react'
import { fetchUserDetail, toggleUserLock } from '../../services/userService'
import useLocationData from '../../services/useLocationData'

const UserDetail = () => {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState('basic')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUserData = async () => {
      setLoading(true)
      const data = await fetchUserDetail(id)
      if (data) setUser(data)
      setLoading(false)
    }
    getUserData()
  }, [id])

  const locationData = useLocationData(user?.address)

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN') // Định dạng dd/mm/yyyy
  }

  if (loading) return <CSpinner color="primary" />
  if (!user) return <p>User not found.</p>

  return (
    <CCard className="mt-4">
      <CCardHeader>
        <h5>
          User Detail: {user.firstName} {user.lastName}
        </h5>
      </CCardHeader>
      <CCardBody>
        {/* Tabs */}
        <CNav variant="tabs" role="tablist">
          <CNavItem>
            <CNavLink active={activeTab === 'basic'} onClick={() => setActiveTab('basic')}>
              Basic Info
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink active={activeTab === 'sports'} onClick={() => setActiveTab('sports')}>
              Sports
            </CNavLink>
          </CNavItem>
        </CNav>

        {/* Tab Content */}
        <CTabContent className="mt-4">
          {/* Basic Info Tab */}
          <CTabPane visible={activeTab === 'basic'}>
            <CRow>
              <CCol md="6">
                <p>
                  <strong>Name:</strong> {user.firstName} {user.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Phone:</strong> {user.phone}
                </p>
                <p>
                  <strong>Birthday:</strong> {formatDate(user.birthday)}
                </p>
                <p>
                  <strong>Account Created:</strong> {formatDate(user.createdOn)}
                </p>
              </CCol>
              <CCol md="6">
                <p>
                  <strong>Address:</strong> {user.address.no}, {locationData.ward},{' '}
                  {locationData.district}, {locationData.city}
                </p>
                <CAvatar
                  src={`${import.meta.env.VITE_PATH_IMAGE}avatar/${user.avatar}`}
                  size="lg"
                />
              </CCol>
            </CRow>
          </CTabPane>

          {/* Sports Tab */}
          <CTabPane visible={activeTab === 'sports'}>
            <CRow>
              {user.sports && user.sports.length > 0 ? (
                user.sports.map((sport) => (
                  <CCol key={sport.id} md="3" className="mb-4 text-center">
                    <img
                      src={`${import.meta.env.VITE_PATH_IMAGE}sports/${sport.image}`}
                      style={{ width: '80px', height: '80px' }}
                    />
                    <p>
                      <strong>{sport.sportName}</strong>
                    </p>
                  </CCol>
                ))
              ) : (
                <p>No sports selected.</p>
              )}
            </CRow>
          </CTabPane>
        </CTabContent>
      </CCardBody>
    </CCard>
  )
}

export default UserDetail
