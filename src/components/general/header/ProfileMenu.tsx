import React, { Fragment, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu } from '@headlessui/react'
import { signOut } from "next-auth/react"
import { Session } from 'next-auth'

interface ProfileMenuProps {
  user: { id: string, name: string, email: string, image: string }
}

export const ProfileMenu = ({ user }: ProfileMenuProps) => {

  console.log('user',user);

  return (
    <Menu as="div" className="relative flex">
      <div>
        <Menu.Button className="relative flex justify-center items-center space-x-2">
          <a className="sr-only">Abrir preferencias</a>
          <img src={user?.image} alt={user?.name} width={30} height={30} className='rounded-lg' />
          <a className='cursor-pointer hover:text-blue-500'>{user?.name}</a>
        </Menu.Button>
      </div>
      <Menu.Items className="absolute right-0 z-10 block mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg w-52 top-6 ring-1 ring-black ring-opacity-5 focus:outline-none">
        <Menu.Item>
          { ({ active }) => (
            <Link href='/publica-tu-espacio'>
              <a className='flex items-center w-full gap-1 px-4 py-2 text-sm font-semibold text-gray-900 rounded-md group hover:bg-blue-100'>Publica tu espacio</a>
            </Link>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <a
              onClick={() => signOut()}
              className={`${active ? 'bg-blue-100' : ''} group flex gap-1 rounded-md items-center w-full px-4 py-2 text-sm text-gray-900 font-semibold`}
            >
              salir
            </a>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  )
}
