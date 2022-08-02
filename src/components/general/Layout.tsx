import { useSession } from 'next-auth/react'
import React from 'react'
import { Header } from './header/Header'
import { Loading } from './Loading'

interface LayoutProps {
  children: any
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}
