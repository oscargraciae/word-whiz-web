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
        <MenuNavLink onClick={() => setOpenLogin(true)} text='Inicio de sesión' />
        <MenuNavLink onClick={() => setOpenSignup(true)} text='Crear cuenta' />
      </div>
      <Signup isOpen={openSignup} onOpen={() => setOpenSignup(true)} onClose={() => setOpenSignup(!openSignup)}  />
      <Login isOpen={openLogin} onOpen={() => setOpenLogin(true)} onClose={() => setOpenLogin(!openLogin)}  />
    </>
  )
}
