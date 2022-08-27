import React from 'react'
import { AiFillSound } from 'react-icons/ai'
import { colorByProgress } from '../../utils/progress-color'
import { textToSpeak } from '../../utils/text-to-speak'
import { trpc } from '../../utils/trpc'

export const VocabularyLearned = () => {
  const { data: words } = trpc.useQuery(['vocabulary_learned.getAll'])

  return (
    <div>
      <div className='pb-6'>
        <h1 className='text-4xl'>Vocabulario que has aprendido</h1>
        <h3 className='text-gray-500'>{words?.length} palabras</h3>
      </div>

      <div className='grid grid-cols-4 py-6 font-semibold border-b'>
        <div className='col-span-2'>Inglés</div>
        <div>Español</div>
        <div>Progreso</div>
      </div>
      { words?.map((item: any, index: number) => {
        const { vocabulary } = item
        return (
          <div key={index} className='grid items-center grid-cols-4 py-4 capitalize border-b'>
            <div className='flex flex-row items-center col-span-2 space-x-8'>
              <img src={vocabulary.image} className='object-cover rounded-md aspect-video h-11' />
              <div className='text-center'>
                <button onClick={() => textToSpeak(vocabulary.wordEnglish)} className='p-3 text-white bg-indigo-500 rounded-full'>
                  <AiFillSound />
                </button>
              </div>
              <span>{vocabulary.wordEnglish}</span>
            </div>

            <div>{vocabulary.wordSpanish}</div>
            <div className='flex flex-row items-center justify-between space-x-6 '>
              <div className='w-full h-2 bg-gray-200 rounded-full'>
                <div className={`w-full h-full bg-indigo-500 rounded-full ${colorByProgress(item.progress)}`} style={{ width: `${item.progress}%` }}></div>
              </div>
              {/* <span className='text-sm text-indigo-500'>{item.progress}%</span> */}
            </div>
          </div>
        )
      }) }
    </div>
  )
}
