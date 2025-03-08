import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const CheckGD = React.lazy(() => import('./views/pages/checkGD'))

//User:
const User = React.lazy(() => import('./views/users/User'))
const UserList = React.lazy(() => import('./views/users/UserList'))
const UserCreate = React.lazy(() => import('./views/users/UserCreate'))
const UserDetail = React.lazy(() => import('./views/users/UserDetail'))
const LockedUsers = React.lazy(() => import('./views/users/UsersLocked'))
const FeedbackSupportManagement = React.lazy(() => import('./views/feedback/feedbackManagement'))

//Sport:
const SportList = React.lazy(() => import('./views/sports/sportList'))
const CreateSport = React.lazy(() => import('./views/sports/createSport'))
const EditSport = React.lazy(() => import('./views/sports/editSport'))

const SportCenterManagement = React.lazy(() => import('./views/sports/sportCenterManagement'))
const SportFieldManagement = React.lazy(() => import('./views/sports/sportFieldManagement'))

//Chatrooms:
const ChatroomList = React.lazy(() => import('./views/chatrooms/ChatroomList'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },

  { path: '/user', name: 'Users', element: User },
  { path: '/users-list', name: 'Users List', element: UserList },
  { path: '/user/create', name: 'UserCreate', element: UserCreate },
  { path: '/user/detail/:id', name: 'User Detail', element: UserDetail },
  { path: '/user/locked', name: 'Locked Users', element: LockedUsers },

  { path: '/sports', name: 'Sports', element: SportList },
  { path: '/sports/create', name: 'Sports', element: CreateSport },
  { path: '/sports/edit/:id', name: 'Sports', element: EditSport },
  { path: '/sports-centers', name: 'SportCenterManagement', element: SportCenterManagement },
  {
    path: '/sports-fields/:sportsCenterId',
    name: 'SportFieldManagement',
    element: SportFieldManagement,
  },

  { path: '/chatrooms', name: 'Chatrooms', element: ChatroomList },

  { path: '/feedback', name: 'Feedback - Support', element: FeedbackSupportManagement },

  { path: '/checkgd', name: 'CheckGD', element: CheckGD },
]

export default routes
