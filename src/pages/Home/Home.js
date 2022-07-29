import React from 'react'
import { useSelector } from 'react-redux'

export default function Home(props) {
  const userLogin = useSelector(state => state.UserCyberBugsReducer.userLogin)
  return (
    <div className='container-fluid mt-3'>
      <h1 className='text text-danger'>User Management and Cyberbugs Project</h1>
      <h3>Hi, {userLogin?.name}!</h3>
    </div>
  )
}
