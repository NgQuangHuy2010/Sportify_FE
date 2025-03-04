import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CRow, CCol, CWidgetStatsA, CButton } from '@coreui/react'
import { CChartPie, CChartBar } from '@coreui/react-chartjs'

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    lockedUsers: 0,
    newUsersThisMonth: 0,
    usersBySport: [],
  })
  const [usersByMonth, setUsersByMonth] = useState({})
  const [year, setYear] = useState(new Date().getFullYear())

  useEffect(() => {
    fetch('http://localhost:8080/api/admin/dashboard/user-statistics')
      .then((response) => response.json())
      .then((data) => setStats(data))
      .catch((error) => console.error('Error fetching data:', error))
  }, [])

  useEffect(() => {
    fetch(`http://localhost:8080/api/admin/dashboard/statistics/users-by-month?year=${year}`)
      .then((response) => response.json())
      .then((data) => setUsersByMonth(data))
      .catch((error) => console.error('Error fetching data:', error))
  }, [year])

  return (
    <div className="container mt-4">
      <CRow>
        <CCol md="4">
          <CWidgetStatsA
            className="mb-4"
            color="primary"
            value={stats.totalUsers}
            title="Total Users"
          />
        </CCol>
        {/* <CCol md="4">
          <CWidgetStatsA
            className="mb-4"
            color="danger"
            value={stats.lockedUsers}
            title="Locked Users"
          />
        </CCol> */}
        <CCol md="4">
          <CWidgetStatsA
            className="mb-4"
            color="success"
            value={stats.newUsersThisMonth}
            title="New Users This Month"
          />
        </CCol>
      </CRow>
      <CCard>
        <CCardHeader>Users by Sport</CCardHeader>
        <CCardBody>
          <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            <CChartPie
              data={{
                labels: stats.usersBySport.map((sport) => sport.sportName),
                datasets: [
                  {
                    data: stats.usersBySport.map((sport) => sport.userCount),
                    backgroundColor: [
                      '#FF6384',
                      '#36A2EB',
                      '#FFCE56',
                      '#4BC0C0',
                      '#9966FF',
                      '#FF9F40',
                    ],
                  },
                ],
              }}
            />
          </div>
        </CCardBody>
      </CCard>

      <CCard className="mt-4">
        <CCardHeader>
          Users by Month ({year})
          <div className="float-end">
            <CButton color="secondary" onClick={() => setYear(year - 1)}>
              Previous Year
            </CButton>
            <CButton color="secondary" className="ms-2" onClick={() => setYear(year + 1)}>
              Next Year
            </CButton>
          </div>
        </CCardHeader>
        <CCardBody>
          <CChartBar
            data={{
              labels: Object.keys(usersByMonth).map((month) => `Month ${month}`),
              datasets: [
                {
                  label: 'Users',
                  data: Object.values(usersByMonth),
                  backgroundColor: '#36A2EB',
                },
              ],
            }}
          />
        </CCardBody>
      </CCard>
    </div>
  )
}

export default Dashboard
