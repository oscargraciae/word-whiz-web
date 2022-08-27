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

  const CorrectWordsResume = () => {
    return (
      <div className='border rounded-lg shadow-lg'>
        <div className='px-4 py-2 mb-6 text-white bg-green-500 rounded-t-lg'>
          <p>Aciertos</p>
        </div>
        <div className='flex flex-col py-4 space-y-4'>
          { Object.entries(correctWords).map(([key, item], index) => {
            const vocabulary: any = item
            return (
              <div key={key} className='grid grid-cols-4 place-items-center'>
                <div><img src={item.image} className='object-cover rounded-md aspect-video h-11' /></div>
                <div className='capitalize'>{key}</div>
                <div>{vocabulary.wordSpanish}</div>
                <div>{vocabulary.total}</div>
              </div>
            )
          }) }
        </div>
      </div>
    )
  }

  const WrongWordsResume = () => {
    return (
      <div className='h-full border rounded-lg shadow-lg'>
        <div className='px-4 py-2 mb-6 text-white bg-red-500 rounded-t-lg'>
          <p>Errores</p>
        </div>
        <div className='flex flex-col flex-1 py-4 space-y-4 overflow-auto'>
          { Object.entries(wrongWords).map(([key, item], index) => {
            const vocabulary: any = item
            return (
              <div key={key} className='grid grid-cols-4 place-items-center'>
                <div><img src={item.image} className='object-cover rounded-md aspect-video h-11' /></div>
                <div className='capitalize'>{key}</div>
                <div>{vocabulary.wordSpanish}</div>
                <div>{vocabulary.total}</div>
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
        <h1 className='text-4xl font-bold'>Has finalizado la lección!</h1>
        <h3 className='text-xl'>Has ganado <span className='font-semibold text-indigo-500'>{score}</span> puntos</h3>
        <div className='absolute top-0 right-0 flex items-center justify-center'>
          <ScoreIcon />
          <span className='absolute text-6xl text-red-500 -rotate-6'>{grade}</span>
        </div>

        <div className='grid w-2/3 h-full grid-cols-2 gap-x-6'>
          { CorrectWordsResume() }
          { WrongWordsResume() }
        </div>
      </div>
      <div id='footer' className='flex flex-row items-center justify-between w-full h-28'>
        <button onClick={() => router.reload()} className='px-8 py-3 text-xl text-gray-800 bg-white border border-gray-800 rounded-lg disabled:bg-gray-300 disabled:border-gray-300'>
          Repetir
        </button>
        <button onClick={() => router.push('/')} className='px-8 py-3 text-xl text-white bg-indigo-500 border border-indigo-800 rounded-lg disabled:bg-gray-300 disabled:border-gray-300'>
          Continuar
        </button>
      </div>
    </div>
  )
}
