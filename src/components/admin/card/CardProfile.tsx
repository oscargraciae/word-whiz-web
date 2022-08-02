import React, { useState } from "react"
import { useSession } from "next-auth/react"
import { CardLink } from "./CardLink"
import { NewItemButton } from "./NewItemButton"
import { FiEdit, FiTrash, FiGrid, FiList } from "react-icons/fi"
import { NewItemModal } from "./modal-new/NewItemModall"
import { trpc } from "../../../utils/trpc"
import { useRouter } from "next/router"
import { useCardContext } from "../../../context/CardContext"

export const CardProfile = () => {
  const [isOpenNewItem, setIsOpenNewItem] = useState(false)

  const { name, description, cover } = useCardContext()

  const { data: session } = useSession()
  // const router = useRouter()
  // const { name } = useCardContext()

  // const { data: card } = trpc.useQuery(['card.get', { slug: router.query.slug as string }])

  return (
    <>
      <NewItemModal isOpen={isOpenNewItem} setIsOpen={setIsOpenNewItem} />
      <div className="w-[600px] rounded-2xl bg-white shadow-lg">
        <div id='cover' className="w-full h-[200px] relative">
          {/* <img src="https://pbs.twimg.com/profile_banners/176662765/1521760730/600x200" alt="cover-oscar" className="rounded-t-2xl" /> */}
          <img src={cover} alt="cover-oscar" className="rounded-t-2xl" />
        </div>

        <div id='description' className="flex flex-row px-3">
          <div className="relative w-40 h-8">
            <div id='user-image' className="absolute w-40 h-40 p-1 bg-white rounded-full -bottom-10">
              <img src={session?.user.image} alt="cover-oscar" height={160} width={160} className='rounded-full' />
            </div>
          </div>
          <div className="py-4 pl-4 space-y-1">
            <h1 className="text-2xl">{name}</h1>
            <h2 className="text-sm text-gray-500">Monterrey, Nuevo Leon</h2>
            <h3 className="text-sm text-gray-500">{description}</h3>
          </div>
        </div>

        <div className="px-3 py-4">
          <section id='content-section' className="px-3 py-6 space-y-2 border border-transparent hover:border-gray-300 rounded-2xl">
            <div id="header-section" className="flex flex-row items-center justify-between py-1 hover:bg-gray-200 rounded-2xl">
              <h2 className="pl-8 text-lg">Redes sociales</h2>
              <div className='space-x-2'>
                <button className='p-2 rounded-full hover:bg-gray-100'><FiList /></button>
                {/* <button className='p-2 rounded-full hover:bg-gray-100'><FiGrid /></button> */}
                <button className='p-2 rounded-full hover:bg-gray-100'><FiEdit /></button>
                <button className='p-2 rounded-full hover:bg-gray-100'><FiTrash /></button>
              </div>
            </div>
            <CardLink title="Facebook" url="https://facebook.com/oscargraciae" />
            <NewItemButton onClick={() => setIsOpenNewItem(true)} />
          </section>

          <button className="w-full px-6 py-3 mt-8 bg-white border-4 border-dotted rounded-xl">Nueva seccion</button>
        </div>
      </div>
    </>
  )
}
