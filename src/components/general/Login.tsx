import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { BsFacebook } from 'react-icons/bs'
import { signIn } from "next-auth/react"

import { Modal, ModalBody } from '../common/Modal'
import { SocialButton } from '../signup/SocialButton'

interface SignupProps {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const Login = ({ isOpen, onOpen, onClose }: SignupProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalBody>
        <div className='px-6 pb-6 text-center'>
          <div className='space-y-2'>
            <h3 className='text-2xl'>Inicia sesión</h3>
          </div>

          <div className='mt-12 space-y-3'>
            <SocialButton text='Continua con Facebook' icon={<BsFacebook color='#4267B2' />} onClick={() => signIn('google')} />
            <SocialButton text='Continua con Google' icon={<FcGoogle />} onClick={() => signIn('google')} />
          </div>

          <div className='mt-4'>
            <p className='text-sm'>Al registrarte, confirmas que aceptas Términos y condiciones Política de privacidad</p>
          </div>
        </div>
      </ModalBody>
    </Modal>
  )
}
