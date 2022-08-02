import React, { useState } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { HeaderMenuWithSession } from './HeaderMenuWithSession'
import { HeaderMenuWithoutSession } from './HeaderMenuWithoutSession'
import { Loading } from '../Loading'

export const Header = () => {
  const { data: session, status } = useSession()

  const HeaderMenu = () => {
    if (status === 'loading') return <Loading />
    if (session && session.user) return <HeaderMenuWithSession user={session.user as any} />

    return <HeaderMenuWithoutSession />
  }

  return (
    <header className='w-full px-6 py-3 mx-auto '>
      <nav className='container flex items-center justify-end mx-auto'>
        {/* <h1 className='font-bold'><Link href='/'>smart.cards</Link></h1> */}
        <HeaderMenu />
      </nav>
    </header>
  )
}
