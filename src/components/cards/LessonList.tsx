import React from 'react'
import { trpc } from '../../utils/trpc'
import { Lesson } from './Lesson'

export const LessonList = ({ topicId, title }: { topicId: string, title: string }) => {

  const { data } = trpc.useQuery(['lesson.getAll', { topicId }])

  return (
    <>
      <h2 className='mb-4 text-2xl font-semibold'>{title}</h2>
      <div className="grid grid-cols-5">
        { data?.lessons.map((lesson, index) => <Lesson key={index} lesson={lesson} />) }
      </div>
    </>
  )
}
