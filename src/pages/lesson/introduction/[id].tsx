import { useRouter } from 'next/router'
import React from 'react'
import { AiFillSound } from 'react-icons/ai'
import { LoadingScreen } from '../../../components/general/LoadingScreen'
import { textToSpeak } from '../../../utils/text-to-speak'

import { trpc } from '../../../utils/trpc'

export default function LessonIntroduction() {
  const router = useRouter()

  const { data, isLoading } = trpc.useQuery(['lesson.get', { id: router.query.id as string }])
  const lesson = data?.lesson

  const playSound = (text: string) => {
    textToSpeak(text)
  }

  if (isLoading) return <LoadingScreen />

  return (
    <div className='page-content'>
      <div className='container w-[50%] mx-auto mb-8'>
        <div className='flex flex-row items-center justify-between py-4 space-y-3'>
          <div className='space-y-2'>
            <h1 className='text-6xl'>{lesson?.name}</h1>
            <p className='text-gray-600'>En esta leccion aprenderas las siguientes palabras</p>
          </div>
          <button onClick={() => router.push(`/lesson/${lesson?.id}`)} className='py-6 text-lg btn-primary'>Comenzar leccion</button>
        </div>
        <div className='px-6 mt-6 bg-white rounded-lg shadow-lg'>
          {/* <h2 className='py-4 text-2xl'>Vocabulario</h2> */}
          { isLoading && <LoadingScreen /> }
          { lesson?.vocabulary.map((item: any, index: number) => {
            return (
              <div key={index} className='grid items-center grid-cols-4 py-4 capitalize border-b'>
                <div>
                  <img src={item.image} className='object-cover rounded-md aspect-video h-11' />
                </div>
                <p>{item.wordEnglish}</p>
                <p>{item.wordSpanish}</p>
                <div className='text-center'>
                  <button onClick={() => playSound(item.wordEnglish)} className='p-4 text-white bg-indigo-500 rounded-full'>
                    <AiFillSound />
                  </button>
                </div>
              </div>
            )
          }) }
        </div>
      </div>
    </div>
  )
}
