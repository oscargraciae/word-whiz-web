import React from "react"

interface SocialButtonProps {
  text: string
  icon: any
  onClick: () => void
}

export const SocialButton = ({ text, icon, onClick }: SocialButtonProps) => {
  return (
    <button className='flex justify-center w-full px-6 py-4 text-center border-2 rounded-lg hover:border-gray-600' onClick={onClick}>
      <div className="flex items-center justify-start w-56 text-black justify-self-center">
        {icon} <span className="pl-4">{text}</span>
      </div>
    </button>
  )
}
