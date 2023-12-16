import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { AiFillSound } from 'react-icons/ai'
import { useLessonContext } from '../../context/LessonContext'
import { textToSpeak } from '../../utils/text-to-speak'
import { trpc } from '../../utils/trpc'
import { ScoreIcon } from '../icons/ScoreIcon'

export const LessionFinished = () => {
  const [grade, setGrade] = React.useState(0)
  const { score, correctWords, wrongWords } = useLessonContext()
  const router = useRouter()

  const mutation = trpc.useMutation(['user.update-score'])
  const lessonUserMutation = trpc.useMutation(['lesson_user.create'])

  useEffect(() => {
    const snd = new Audio("/finished_lesson.flac"); // buffers automatically when created
    snd.play();
    mutation.mutate({ score })
    lessonUserMutation.mutate({ lessonId: router.query.id as string })
  }, [])

  useEffect(() => {
    const totalWrongs = Object.entries(wrongWords).reduce((acc, [key, item]) => acc + item.total, 0)

    const grade = Math.round(((15 - totalWrongs) / 15) * 100)
    setGrade(grade)
  }, [])

  const WordsResume = ({ label, type }: { label: string, type: string }) => {
    const words = type === 'correct' ? correctWords : wrongWords
    return (
      <div className='border rounded-lg shadow-lg h-[420px]'>
        <div className={`px-4 py-2 text-white rounded-t-lg ${type === 'correct' ? 'bg-green-500' : 'bg-red-500'}`}>
          <p>{label}</p>
        </div>
        <div className='flex flex-col items-center justify-start w-full px-8 pb-4 space-y-4 h-[370px] overflow-auto pt-4'>
          <div className='grid w-full grid-cols-9'>
            <div className='items-start justify-start col-span-5 text-left'>Ingles</div>
            <div className='col-span-3'>Español</div>
            <div>Veces</div>
          </div>
          { Object.entries(words).map(([key, item]) => {
            const vocabulary: any = item
            return (
              <div key={key} className='grid items-center w-full grid-cols-9 text-left capitalize'>
                <div className='flex flex-row items-center col-span-5 space-x-8'>
                  <img src={vocabulary.image} className='object-cover rounded-md aspect-video h-11' />
                  <div className='text-center'>
                    <button onClick={() => textToSpeak(vocabulary.wordEnglish)} className='p-3 text-white bg-indigo-500 rounded-full'>
                      <AiFillSound />
                    </button>
                  </div>
                  <span>{vocabulary.wordEnglish}</span>
                </div>
                <div className='col-span-3'>{vocabulary.wordSpanish}</div>
                <div className='text-right'>
                  <span>{vocabulary.total}</span>
                </div>
              </div>
            )
          }) }
        </div>
      </div>
    )
  }

  return (
    <div className='container flex flex-col items-center justify-center flex-1 w-full h-full mx-auto'>
      <div className='relative flex flex-col items-center justify-center w-full h-full pt-8 space-y-12'>
        <div className='space-y-2 text-center'>
          <h1 className='text-4xl font-bold'>¡Has finalizado la lección!</h1>
          <h3 className='text-xl'>Has ganado <span className='font-semibold text-indigo-500'>{score}</span> puntos</h3>
        </div>
        <div className='absolute right-0 flex items-center justify-center -top-8'>
          <ScoreIcon />
          <span className='absolute text-6xl text-red-500 -rotate-6'>{grade}</span>
        </div>

        <div className='grid w-full h-full grid-cols-2 pt-12 gap-x-6'>
          { WordsResume({ label: 'Aciertos', type: 'correct' }) }
          { WordsResume({ label: 'Errores', type: 'wrongs' }) }
        </div>
      </div>
      <div id='footer' className='flex flex-row items-center justify-between w-full h-28'>
        <button onClick={() => router.reload()} className='px-8 py-3 text-xl text-gray-800 bg-white border border-gray-800 rounded-lg disabled:bg-gray-300 disabled:border-gray-300'>
          Repetir
        </button>
        <button onClick={() => router.push('/')} className='btn-primary-large hover:bg-primary-800'>
          Continuar
        </button>
      </div>
    </div>
  )
}
