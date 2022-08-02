import React from "react";

interface ButtonProps {
  className?: string
  text: string
  onClick?: () => void
}

export const Button = ({ text, className, onClick }: ButtonProps) => {
  return (
    <button className={"px-6 py-3 text-sm text-white bg-indigo-600 rounded-2xl " + className} onClick={onClick} >{text}</button>
  )
}
