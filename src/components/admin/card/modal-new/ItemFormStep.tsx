import React from "react";
import { useNewItemContext } from "../../../../context/NewItemContext";
import { Button } from "../../../common/Button";
import { Input } from "../../../common/Input";


// titulo, url, privacidad


export const ItemFormStep = () => {
  const { selectedItem, setStep } = useNewItemContext();

  const ItemWithUrl = () => {
    return (
      <div className="space-y-3">
        <div className="space-y-1">
          <label className="text-sm">Titulo</label>
          <Input placeholder="Ingresa el titulo del enlace" />
        </div>
        <div className="space-y-1">
          <label className="text-sm">Enlace (url)</label>
          <Input placeholder="Ingresa el enlace" />
        </div>
      </div>
    )
  }

  const ItemContact = () => {
    return (
      <div className="space-y-3">
        <div className="space-y-1">
          <label className="text-sm">Titulo</label>
          <Input placeholder="Ingresa el titulo del enlace" />
        </div>
        <div className="space-y-1">
          <label className="text-sm">Información</label>
          <Input placeholder="Ingresa el enlace" />
        </div>
      </div>
    )
  }

  const ItemFormBuilder = () => {
    switch (selectedItem.hasUrl) {
      case true:
        return <ItemWithUrl />
      default:
        return <ItemContact />
    }
  }

  return (
    <div className="py-4">

      {ItemFormBuilder()}
      <div className="flex pt-6 space-x-2">
        <Button text="Regresar" className="text-black bg-gray-200" onClick={(() => setStep(1))} />
        <div className="flex-grow" />
        <Button text="Cancelar" className="text-black bg-gray-200" />
        <Button text="Guardar" />
      </div>
    </div>
  )
}
