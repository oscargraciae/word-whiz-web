import React, { useEffect } from "react"
import { trpc } from "../../utils/trpc"
import { Lesson } from "../cards/Lesson"

export const LastLessons = () => {
  const [lessons, setLessons] = React.useState<any[]>([])

  const { data } = trpc.useQuery(['lesson_user.lastLessons'])

  useEffect(() => {
    if (data) {
      const lastLessons = data.map((lessonUser: any) => lessonUser.lesson)
      setLessons(lastLessons)
    }
  }, [data])

  if (data?.length === 0) return null

  return (
    <>
      <h2 className='mb-4 text-2xl font-semibold'>Continuar aprendiendo</h2>
      <div className="grid grid-cols-5">
        { lessons?.map((lesson, index) => <Lesson key={index} lesson={lesson} />) }
      </div>
    </>
  )
}
