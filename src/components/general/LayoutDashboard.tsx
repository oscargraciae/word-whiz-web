import React, { Children, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Header } from "./header/Header";
import { LoadingScreen } from "./LoadingScreen";

interface LayoutDashboardProps {
  children: React.ReactNode;
}

export const LayoutDashboard = ({ children }: LayoutDashboardProps) => {
  const { status, data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return
    if (status === "unauthenticated") router.push("/")
  }, [status])

  if (status === "loading" || status === 'unauthenticated') return <LoadingScreen />

  return (
    <div>
      <Header />
      <div className='container py-4 m-auto'>
        {children}
      </div>
    </div>
  )
}
