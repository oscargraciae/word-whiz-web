import { createContext, useContext, useEffect, useState } from "react"
import router, { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import { Loading } from "../components/general/Loading"
import { trpc } from "../utils/trpc"
import { LoadingScreen } from "../components/general/LoadingScreen"

interface LocationProps {
  lat: number
  lng: number
}

interface BoardingContext {
  step: string
  title: string;
  setTitle: any
  address: string
  setAddress: any
  location?: LocationProps | null
  setLocation: any
  handlerNextStep: any
  handleBackStep: any
  isValidForm: boolean
  isLoading: boolean
}

const BoardingContext = createContext<BoardingContext>(null!)

export const OnBoardingProvider = ({ children, step }: any) => {
  const [title, setTitle] = useState('')
  const [address, setAddress] = useState('')
  const [location, setLocation] = useState<LocationProps | null>(null)
  const [isValidForm, setIsValidForm] = useState(false)

  const { status } = useSession()
  const router = useRouter()

  const createSpace = trpc.useMutation('space.create', {
    onSuccess: (space: any) => {
      router.push('/space/[id]', `/space/${space.id}`)
    }
  })

  useEffect(() => {
    if (status === 'loading') return
    if (status === 'unauthenticated') router.push('/space/boarding/0')
    if (status === 'authenticated') router.push('/space/boarding/1')
  }, [status])

  useEffect(() => {
    setIsValidForm(false)
    if (step === '1') {
      if (title.length > 0) setIsValidForm(true)
    }

    if (step === '2') {
      if (location?.lat && location?.lng) setIsValidForm(true)
    }

    if (step === '3') setIsValidForm(true)

  }, [title, step, location, address])


  const handlerNextStep = async () => {
    if (step === '3') {
      createSpace.mutate({ title })
    } else {
      router.push(`/space/boarding/${Number(step) + 1}`)
    }
  }

  const handleBackStep = () => router.push((Number(step) - 1).toString())

  if (status === 'loading' || createSpace.isLoading) return <LoadingScreen />

  return (
    <BoardingContext.Provider value={{ title, setTitle, handlerNextStep, handleBackStep, isValidForm, step, setAddress, address, setLocation, location, isLoading: createSpace.isLoading }}>
      {children}
    </BoardingContext.Provider>
  )
}

export function useBoardingContext() {
  const context = useContext(BoardingContext)
  if (context === undefined) {
    throw new Error("useBoardingContext must be used within a BoardingProvider")
  }
  return context
}
