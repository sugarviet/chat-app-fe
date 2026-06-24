'use client'

import React from 'react'
import useAuth from '@/hooks/useAuth'

const Layout = ({children}: {children: React.ReactNode}) => {
  // useAuth();
  return (
    <>{children}</>
  )
}

export default Layout