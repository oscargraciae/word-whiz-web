import React from 'react'
import { FaFacebook } from 'react-icons/fa'
import { FiTrash, FiEdit } from 'react-icons/fi'
import { GrDrag } from 'react-icons/gr'

interface CardLinkProps {
  title: string
  url: string
}

export const CardLink = ({ title, url }: CardLinkProps) => {
  return (
    <div id='link' className="flex items-center px-1 py-4 bg-white rounded-xl">
      <div className='w-3'>
        <GrDrag />
      </div>
      <div id='icon-link' className="flex items-center justify-center w-12 h-12 mx-3 bg-blue-600 rounded-2xl">
        <FaFacebook color="#FFFFFF" size={28} />
      </div>
      <div className='flex-1'>
        <p>{title}</p>
        <p>{url}</p>
      </div>
      <div className='space-x-2'>
        <button className='p-2 rounded-full hover:bg-gray-100'><FiEdit /></button>
        <button className='p-2 rounded-full hover:bg-gray-100'><FiTrash /></button>
      </div>
    </div>
  )
}
