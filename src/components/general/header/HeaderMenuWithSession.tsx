import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { TbBook, TbSchool } from 'react-icons/tb'

import { ProfileMenu } from "./ProfileMenu"

interface HeaderMenuWithoutSessionProps {
  user: { id: string, name: string, email: string, image: string, score: number }
}

export const HeaderMenuWithSession = ({ user }: HeaderMenuWithoutSessionProps) => {

  const router = useRouter()

  return (
    <div className="flex flex-row justify-between flex-1 pl-12 ">
      <div className="flex flex-row items-center justify-between space-x-6">
        <Link href="/lessons">
          <a className={`${router.pathname === '/lessons' && 'text-indigo-500 bg-indigo-100 rounded-lg'} px-4 py-2 flex flex-row items-center justify-between space-x-2`}>
            <TbBook />
            <span>Lecciones</span>
          </a>
        </Link>
        <Link href="/vocabulary">
          <a className={`${router.pathname === '/vocabulary' && 'text-indigo-500 bg-indigo-100 rounded-lg'} px-4 py-2 flex flex-row items-center justify-between space-x-2`}>
            <TbSchool />
            <span>Vocabulario</span>
          </a>
        </Link>
        {/* <a>Comunidad</a> */}
      </div>
      <div className='flex items-center space-x-6'>
        <span className="px-4 py-1 text-sm font-semibold border-indigo-500 rounded-full bg-indigo-50">{user.score} PTS</span>
        <ProfileMenu user={user} />
      </div>
    </div>
  )
}
