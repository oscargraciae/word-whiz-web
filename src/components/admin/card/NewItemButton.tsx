import React from "react";
import { Menu } from "@headlessui/react";

interface NewItemButtonProps {
  onClick: () => void
}

export const NewItemButton = ({ onClick }: NewItemButtonProps) => {
  return (
    <button className="w-full px-6 py-3 mt-8 bg-gray-200 border border-dotted rounded-xl hover:bg-gray-300" onClick={onClick}>Añadir</button>
  )
}
