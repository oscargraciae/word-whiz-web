import React, { useContext, useEffect, useState } from "react";

interface NewItemContextProps {
  step: number
  setStep: (step: number) => void
  selectedItem: any
  setSelectedItem: (selectedItem: any) => void
  handleSelctedItem: (selectedItem: any) => void
}

const NewItemContext = React.createContext<NewItemContextProps>({});

interface NewItemProviderProps {
  children: any
  setStep: (step: number) => void
  step: number
}

export const NewItemProvider = ({ children, step, setStep }: NewItemProviderProps) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelctedItem = (selectedItem: any) => {
    setSelectedItem(selectedItem);
    setStep(2)
  }

  useEffect(() => {
    return () => {
      setSelectedItem(null)
      setStep(1)
    }
  }, [])

  return (
    <NewItemContext.Provider value={{ selectedItem, setSelectedItem, handleSelctedItem, step, setStep }}>
      {children}
    </NewItemContext.Provider>
  )
}

export function useNewItemContext() {
  const context = useContext(NewItemContext)
  if (context === undefined) {
    throw new Error("useNewItemContext must be used within a NewItemContext")
  }
  return context
}

