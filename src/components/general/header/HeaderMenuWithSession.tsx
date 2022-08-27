import React from "react"
import { ProfileMenu } from "./ProfileMenu"

interface HeaderMenuWithoutSessionProps {
  user: { id: string, name: string, email: string, image: string, score: number }
}

export const HeaderMenuWithSession = ({ user }: HeaderMenuWithoutSessionProps) => {
  return (
    <div className="flex flex-row justify-between flex-1 pl-12 ">
      <div className="flex flex-row items-center justify-between space-x-6">
        <a href="/">Aprender</a>
        <a href="/vocabulary">Vocabulario</a>
        <a>Comunidad</a>
      </div>
      <div className='flex items-center space-x-6'>
        <span className="px-4 py-1 text-sm font-semibold border-indigo-500 rounded-full bg-indigo-50">{user.score} PTS</span>
        <ProfileMenu user={user} />
      </div>
    </div>
  )
}
