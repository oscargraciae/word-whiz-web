import React from 'react'
import { trpc } from '../../utils/trpc'
import { LessonList } from '../cards/LessonList'
import { LastLessons } from '../lesson/LastLessons'

export const Lessons = () => {

  const { data, isLoading } = trpc.useQuery(['topic.getAll'])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className='w-full space-y-6'>
      <LastLessons />
      <div className='flex flex-col space-y-6'>
        { data?.topics.map((topic: any, index: number) => (
          <LessonList key={index} topicId={topic.id} title={topic.name} />
        )) }
      </div>
    </div>
  )
}
