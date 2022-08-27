import React from 'react'
import { trpc } from '../../utils/trpc'
import { LessonList } from '../cards/LessonList'

export const Lessons = () => {

  const { data, isLoading } = trpc.useQuery(['topic.getAll'])
  if (isLoading) {
    return <div>Loading...</div>
  }

  const { topics } = data

  return (
    <div className='w-full space-y-6'>
      <div className='flex flex-col space-y-6'>
        { topics.map((topic: any, index: number) => (
          <LessonList key={index} topicId={topic.id} title={topic.name} />
        )) }
      </div>
    </div>
  )
}
