import React from 'react'
import { useCardContext } from '../../../context/CardContext'
import { trpc } from '../../../utils/trpc'

export const CardSettings = () => {
  const { id, setName, name, description, setDescription } = useCardContext()

  const cardMutation = trpc.useMutation('card.update')

  return (
    <div>
      <h1 className='mb-4 text-2xl'>Tarjeta de presentación</h1>
      <div className='space-y-4'>
        <div>
          <label className='text-xs text-slate-400'>Nombre</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-4 border rounded-lg" />
        </div>
        <div>
          <label className='text-xs text-slate-400'>Ciudad</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-4 border rounded-lg" />
        </div>
        <div>
          <label className='text-xs text-slate-400'>Descripción</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-3 py-4 border rounded-lg" rows={3} />
        </div>

        <button
          className='w-full px-6 py-3 text-sm text-white bg-indigo-600 rounded-2xl'
          onClick={() => cardMutation.mutate({ name, description, id })}
        >
          { cardMutation.isLoading ? 'Guardando...' : 'Guardar' }
        </button>
      </div>
    </div>
  )
}
