import React from 'react'

export const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div className='w-full h-4 rounded-full bg-blue-50'>
      <div style={{ width: `${progress}%` }} className='h-4 bg-indigo-500 rounded-full' />
    </div>
  )
}
