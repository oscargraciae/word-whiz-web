import React from 'react'
import { Header } from './header/Header'


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
