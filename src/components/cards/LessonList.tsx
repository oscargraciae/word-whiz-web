import React from 'react'
import { categories } from '../../mocks/categories'
import { trpc } from '../../utils/trpc'
import { Loading } from '../general/Loading'
import { LoadingScreen } from '../general/LoadingScreen'
import { Lesson } from './Lesson'

export const LessonList = ({ topicId, title }: { topicId: string, title: string }) => {

  const { data, isLoading } = trpc.useQuery(['lesson.getAll', { topicId }])

  // if (true) return <Loading />

  return (
    <div>
      <h2 className='mb-4 text-2xl font-semibold'>{title}</h2>
      <div className="grid grid-cols-5">
        { data?.lessons.map((lesson, index) => <Lesson key={index} lesson={lesson} />) }
      </div>
    </div>
  )
}
