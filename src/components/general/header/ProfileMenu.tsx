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
  return (
    <Menu as="div" className="relative flex">
      <div>
        <Menu.Button className="relative flex items-center justify-center space-x-2">
          <a className="sr-only">Abrir preferencias</a>
          {/* <img src={user?.image} alt={user?.name} width={42} height={42} className='rounded-full shadow-2xl' /> */}
          {/* <a className='cursor-pointer hover:text-blue-500'>{user?.name}</a> */}
          <div style={{ backgroundImage: `url(${user?.image})` }} className='object-fill w-12 h-12 bg-cover rounded-full shadow-2xl' />
        </Menu.Button>
      </div>
      <Menu.Items className="absolute right-0 z-10 block mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg w-52 top-6 ring-1 ring-black ring-opacity-5 focus:outline-none">
        {/* <Menu.Item>
          { ({ active }) => (
            <Link href='/publica-tu-espacio'>
              <a className='flex items-center w-full gap-1 px-4 py-2 text-sm font-semibold text-gray-900 rounded-md group hover:bg-blue-100'>Publica tu espacio</a>
            </Link>
          )}
        </Menu.Item> */}
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
