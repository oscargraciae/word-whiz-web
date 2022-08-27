import React from 'react'

export const Score = ({ score }: { score: number }) => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='text-3xl font-bold'>{score}</h1>
      <h2 className='text-xl'>Puntos</h2>
    </div>
  )
}
