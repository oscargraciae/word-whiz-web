import React, { useEffect, useRef } from 'react'
import { useLessonContext } from '../../context/LessonContext'
import { CorrectAnswer } from './CorrectAnswer'
import { LessionFinished } from './LessionFinished'
import { LessonQuestion } from './LessonQuestion'
import { ProgressBar } from './Progesbar'
import { Score } from './Score'
import { WrongAnswer } from './WrongAnswer'

export const LessonBuilder = () => {

  const { handleVocabulary, answer, score, totalAnswers, countDown, numOfQuestions, lessonStatus, statusAnswer, currentVocabulary } = useLessonContext()

  useEffect(() => {
    const handleClick = (event: any) => {
      if (event.keyCode == 13) {
        const buttonSubmit: any = document.querySelector('#buttonSubmit')!
        buttonSubmit?.click()
      }
    };

    document.addEventListener('keypress', handleClick);
  }, []);

  if (lessonStatus === 'finished' || lessonStatus === 'losed') return <LessionFinished />

  if (statusAnswer === 'incorrect') return <WrongAnswer vocabulary={currentVocabulary} />

  if (statusAnswer === 'correct') return <CorrectAnswer />

  return (
    <form id='form' onSubmit={handleVocabulary} className='container flex flex-col flex-1 max-w-4xl py-6 mx-auto'>
      <div className='flex flex-row items-center justify-between w-full space-x-8'>
        <ProgressBar progress={(totalAnswers * 100) / numOfQuestions} />
        <Score score={score} />
        <span>{countDown}</span>
      </div>
      <div className='flex w-full h-full py-8'>
        { statusAnswer === 'none' && <LessonQuestion /> }
        {/* { statusAnswer === 'incorrect' && <WrongAnswer vocabulary={currentVocabulary} /> }
        { statusAnswer === 'correct' && <CorrectAnswer /> } */}
      </div>
      { statusAnswer === 'none' && (
        <div id='footer' className='flex flex-row items-center justify-end w-full h-28'>
          <button id='buttonSubmit' disabled={!answer} type='submit' className='px-8 py-3 text-xl text-white bg-indigo-500 border border-indigo-800 rounded-lg disabled:bg-gray-300 disabled:border-gray-300'>
            Siguiente
          </button>
        </div>
      ) }

    </form>
  )
}
