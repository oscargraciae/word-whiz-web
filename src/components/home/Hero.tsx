import Image from 'next/image'
import React from 'react'

import { HeroForm } from './HeroForm';


export const Hero = () => {
  return (
    <section id='hero' className="">
      <div className='container flex justify-between py-12 mx-auto'>

        <div className='flex flex-col justify-start w-2/3 pt-6 pr-12 space-y-6'>
          <h1 className='text-6xl font-bold'>Aprende vocabulario en inglés de una manera fácil y divertida</h1>
          {/* <p className='text-slate-500'>Gratis. Fácil. Divertido</p> */}
        </div>
      </div>
    </section>
  )
}
