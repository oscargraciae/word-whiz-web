import Link from "next/link"
import React, { useState } from "react"
import { Login } from "../Login"
import { Signup } from "../Signup"
import { MenuNavLink } from "./MenuNavLink"

export const HeaderMenuWithoutSession = () => {
  const [openSignup, setOpenSignup] = useState(false)
  const [openLogin, setOpenLogin] = useState(false)

  return (
    <>
      <div className='space-x-6'>
        <Link href='/publica-tu-espacio'>
          <a className='px-6 py-3 text-white bg-purple-500 rounded-full'>Publica tu espacio</a>
        </Link>
        <MenuNavLink onClick={() => setOpenLogin(true)} text='Inicio de sesión' />
        <MenuNavLink onClick={() => setOpenSignup(true)} text='Crear cuenta' />
      </div>
      <Signup isOpen={openSignup} onOpen={() => setOpenSignup(true)} onClose={() => setOpenSignup(!openSignup)}  />
      <Login isOpen={openLogin} onOpen={() => setOpenLogin(true)} onClose={() => setOpenLogin(!openLogin)}  />
    </>
  )
}
