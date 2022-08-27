import { useRouter } from 'next/router'
import React from 'react'
import { LessonBuilder } from '../../components/lesson/LessonBuilder'
import { ProgressBar } from '../../components/lesson/Progesbar'
import { LessonProvider } from '../../context/LessonContext'
import { trpc } from '../../utils/trpc'

export default function LessonPage () {
  const router = useRouter()
  const id = router.query.id as string

  const { data, isLoading } = trpc.useQuery(['lesson.get', { id }])
  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <LessonProvider lesson={data?.lesson}>
      <div className='flex flex-1 w-full h-screen'>
        <LessonBuilder />
      </div>
    </LessonProvider>
  )
}
