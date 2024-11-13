import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRouter({children, isAllowed, redirectTo}) {
  if(!isAllowed) return <Navigate to={redirectTo} />
  return children || <Outlet />
}
