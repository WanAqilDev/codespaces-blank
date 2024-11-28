import React from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'

export default function GuestLayout() {
  const {token} = useStateContext()

  if (token) {
    return <Navigate to={"/users"} />
  }

  return (
    <div>
      Guest Layout
      <Outlet />
    </div>
  )
}
