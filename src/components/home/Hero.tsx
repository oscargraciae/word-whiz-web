import Image from 'next/image'
import React from 'react'

import { HeroForm } from './HeroForm';


export const Hero = () => {
  return (
    <section id='hero' className="">
      <div className='container flex justify-between py-12 mx-auto'>

        <div className='flex flex-col justify-start w-1/2 pt-6 pr-12 space-y-6'>
          <h1 className='text-6xl font-bold'>Crea tu tarjeta de presentación inteligente.</h1>
          <p className='text-slate-500'>Conecte audiencias a todo su contenido con un solo enlace.</p>
          <HeroForm />
        </div>
      </div>
    </section>
  )
}
