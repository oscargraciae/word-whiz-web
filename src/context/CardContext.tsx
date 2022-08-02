import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import React, { createContext, ReactElement, useContext, useEffect, useState } from "react"
import { Loading } from "../components/general/Loading"
import { trpc } from "../utils/trpc"

interface CardContextProps {
  id: string
  name: string
  setName: (name: string) => void
  description: string | null
  setDescription: (description: string) => void
  cover?: string
  setCover: (cover: string) => void
}

const CardContext = createContext<CardContextProps>({})

export const CardProvder = ({ children }: { children: ReactElement }) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [cover, setCover] = useState('')

  const { data: session } = useSession()
  const router = useRouter()

  const { data: card, isLoading, status } = trpc.useQuery(['card.get', { slug: router.query.slug as string }])

  useEffect(() => {
    if (status === 'success' && card) {
      setName(card.name)
      setDescription(card.description ?? '')
      setCover(card.cover ?? '')
    }
  }, [status])

  if (isLoading) return <Loading />

  return (
    <CardContext.Provider value={{ id: card?.id!, name, setName, description, setDescription, cover, setCover }}>
      {children}
    </CardContext.Provider>
  )
}

export const useCardContext = () => {
  return useContext(CardContext)
}
