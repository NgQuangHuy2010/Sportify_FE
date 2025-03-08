import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilSpeedometer, cilUser, cilBaseball, cilPencil, cilGroup } from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavTitle,
    name: 'Management',
  },
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'User Management',
    to: '/user',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Sport Management',
    to: '/sports',
    icon: <CIcon icon={cilBaseball} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'SportCenter Management',
    to: '/sports-centers',
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavItem,
  //   name: 'Feedback Management',
  //   to: '/feedback',
  //   icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
  // },
]

export default _nav
