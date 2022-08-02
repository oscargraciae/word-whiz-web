import React, { useState } from 'react'
import { trpc } from '../../utils/trpc';

export const HeroForm = () => {
  const [url, setUrl] = useState('')

  const createProfile = trpc.useMutation('card.create', {
    onSuccess: () => {
      console.log('success');
    },
  })

  return (
    <div className='flex flex-col space-y-4'>
      <input type="text" placeholder="¿Qué estás buscando?" className='w-full px-3 py-4 border border-r-2 rounded-lg outline-none' onChange={(e) => setUrl(e.target.value)} />
      <button
        className='px-4 py-6 text-white bg-indigo-600 rounded-lg'
        onClick={() => createProfile.mutate({ url })}
      >
        Crea tu tarjeta gratis
      </button>
    </div>
  )
}
