import React, { useContext, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { Loading } from '../components/general/Loading'

interface AuthContextProps {
  user: any
  // setUser: any
}

const AuthContext = React.createContext<AuthContextProps>({})

export const AuthProvider = ({ children }: any) => {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/')
  }, [status])

  if (status === 'authenticated') {
    console.log('session data: ', session.user)

    return (
      <AuthContext.Provider value={{ user: session.user }}>
        {children}
      </AuthContext.Provider>
    )
  }

  return (
    <div className='flex flex-col items-center justify-center w-screen h-screen'>
      <Loading />
    </div>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useBoardingContext must be used within a BoardingProvider")
  }
  return context
}
