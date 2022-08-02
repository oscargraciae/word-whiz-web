import React from "react"
import { useSession } from "next-auth/react"
import { Menu } from '@headlessui/react'
import { ProfileMenu } from "./ProfileMenu"
import { userInfo } from "os"

interface HeaderMenuWithoutSessionProps {
  user: { id: string, name: string, email: string, image: string }
}

export const HeaderMenuWithSession = ({ user }: HeaderMenuWithoutSessionProps) => {
  return (
    <div className='flex space-x-6'>
      {/* <a className="cursor-pointer hover:text-blue-500">Mensajes</a>
      <a className="cursor-pointer hover:text-blue-500">Notificaciones</a> */}
      <ProfileMenu user={user} />
    </div>
  )
}
