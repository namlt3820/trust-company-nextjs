'use client'

import { AuthProvider } from '@/providers/Auth'
import { ReactQueryProvider } from '@/providers/QueryClient'
import React from 'react'
import data from '@emoji-mart/data'
import { init } from 'emoji-mart'

// setup emoji
init({ data })

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ReactQueryProvider>
      <AuthProvider>{children}</AuthProvider>
    </ReactQueryProvider>
  )
}
