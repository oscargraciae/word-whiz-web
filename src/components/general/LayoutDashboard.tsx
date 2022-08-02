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
    <div className="flex flex-row h-screen bg-white">
      <div id='sidebar' className="w-56 h-full text-white bg-black border-r">
        <div id='sidebar-header' className="px-4 py-8 text-center">
          <h2 className="text-2xl font-bold text-white">smart.cards</h2>
        </div>
        <div className="flex flex-col space-y-4">
          <a>Mi tarjeta</a>
          <a>Mis contactos</a>
          <a>Estadísticas</a>
        </div>
      </div>
      <div id="container" className="flex flex-col flex-grow flex-shrink w-full overflow-y-auto">
        <Header />
        <div className="container py-4 mx-auto ">
          {children}
        </div>
      </div>
    </div>
  )
}
