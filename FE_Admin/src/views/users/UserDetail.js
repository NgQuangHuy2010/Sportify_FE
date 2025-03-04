import React, { useState } from 'react'
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
} from '@coreui/react'

const UserDetail = () => {
  const [activeTab, setActiveTab] = useState('basic')

  // Dữ liệu mẫu cho người dùng
  const userData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    gender: 'Male',
    avatar: 'https://www.example.com/avatar.jpg',
    address: {
      city: 'New York',
      district: 'Manhattan',
      ward: 'Ward 10',
      no: '123 Main St',
    },
    sports: [
      { id: 1, sportName: 'Basketball', sportImage: 'https://www.example.com/basketball.jpg' },
      { id: 2, sportName: 'Football', sportImage: 'https://www.example.com/football.jpg' },
    ],
    connectionSettings: {
      time: { from: '09:00', to: '18:00' },
      age: { from: 20, to: 30 },
      gender: 'Any',
    },
    friends: [
      { id: 1, name: 'Alice', avatar: 'https://www.example.com/avatar-alice.jpg' },
      { id: 2, name: 'Bob', avatar: 'https://www.example.com/avatar-bob.jpg' },
      { id: 3, name: 'Charlie', avatar: 'https://www.example.com/avatar-charlie.jpg' },
    ],
  }

  return (
    <CCard className="mt-4">
      <CCardHeader>
        <h5>
          User Detail: {userData.firstName} {userData.lastName}
        </h5>
      </CCardHeader>
      <CCardBody>
        {/* Navigation Tabs */}
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
          <CNavItem>
            <CNavLink
              active={activeTab === 'connection'}
              onClick={() => setActiveTab('connection')}
            >
              Connection Settings
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink active={activeTab === 'friends'} onClick={() => setActiveTab('friends')}>
              List Friends
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
                  <strong>Name:</strong> {userData.firstName} {userData.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {userData.email}
                </p>
                <p>
                  <strong>Phone:</strong> {userData.phone}
                </p>
                <p>
                  <strong>Gender:</strong> {userData.gender}
                </p>
              </CCol>
              <CCol md="6">
                <p>
                  <strong>Address:</strong> {userData.address.no}, {userData.address.ward},{' '}
                  {userData.address.district}, {userData.address.city}
                </p>
                <CAvatar src={userData.avatar} size="lg" />
              </CCol>
            </CRow>
          </CTabPane>

          {/* Sports Tab */}
          <CTabPane visible={activeTab === 'sports'}>
            <CRow>
              {userData.sports.map((sport) => (
                <CCol key={sport.id} md="4" className="mb-4">
                  <img src={sport.sportImage} alt={sport.sportName} width="100%" />
                  <p>
                    <strong>{sport.sportName}</strong>
                  </p>
                </CCol>
              ))}
            </CRow>
          </CTabPane>

          {/* Connection Settings Tab */}
          <CTabPane visible={activeTab === 'connection'}>
            <CRow>
              <CCol md="6">
                <p>
                  <strong>Time:</strong> {userData.connectionSettings.time.from} -{' '}
                  {userData.connectionSettings.time.to}
                </p>
                <p>
                  <strong>Age:</strong> {userData.connectionSettings.age.from} -{' '}
                  {userData.connectionSettings.age.to}
                </p>
                <p>
                  <strong>Gender:</strong> {userData.connectionSettings.gender}
                </p>
              </CCol>
            </CRow>
          </CTabPane>

          {/* List Friends Tab */}
          <CTabPane visible={activeTab === 'friends'}>
            <CRow>
              {userData.friends.map((friend) => (
                <CCol key={friend.id} md="4" className="mb-4 text-center">
                  <CAvatar src={friend.avatar} size="lg" />
                  <p>
                    <strong>{friend.name}</strong>
                  </p>
                </CCol>
              ))}
            </CRow>
          </CTabPane>
        </CTabContent>
      </CCardBody>
    </CCard>
  )
}

export default UserDetail
