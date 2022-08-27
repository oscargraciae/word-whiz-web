import React from 'react'
import { useLessonContext } from '../../context/LessonContext'
import { LessonQuestionChoice } from './types/LessonChoice'
import { LessonImageSound } from './types/LessonImageSound'
import { LessonQuestionWrite } from './types/LessonWrite'

export const LessonQuestion = () => {
  return (
    <div className='w-full'>
      <LessonQuestionBuilder />
    </div>
  )
}

const LessonQuestionBuilder = () => {
  const { currentVocabulary, exerciseType } = useLessonContext()
  switch (exerciseType) {
    case 'choice':
      return <LessonQuestionChoice vocabulary={currentVocabulary} />
    case 'write':
      return <LessonQuestionWrite vocabulary={currentVocabulary} />
    case 'image-sound':
        return <LessonImageSound vocabulary={currentVocabulary} />
    default:
      return <LessonQuestionWrite vocabulary={currentVocabulary} />
  }
}

