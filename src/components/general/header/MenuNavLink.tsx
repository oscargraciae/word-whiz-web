import React from 'react'

interface MenuNavLinkProps {
  text: string
  onClick: any
}

export const MenuNavLink = ({ onClick, text }: MenuNavLinkProps) => {
  return (
    <a className="cursor-pointer hover:text-blue-500" onClick={onClick}>{text}</a>
  )
}
