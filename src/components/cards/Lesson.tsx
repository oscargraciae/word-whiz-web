import Link from "next/link";
import React from "react";
import { AiFillCheckCircle } from "react-icons/ai";

export const Lesson = ({ lesson }: { lesson: any }) => {
  const lessonUser = (lesson.lessonUsers && lesson.lessonUsers.length > 0) ? lesson.lessonUsers[0] : null

  return (
    <Link href={`/lesson/introduction/${lesson.id}`}>
      <a>
        <div className={`flex flex-col grid-flow-col mx-2 mb-4 transition duration-300 ease-out bg-white border rounded-lg hover:shadow-lg ${lessonUser?.progress === 100 ? 'bg-green-100 border border-green-700' : 'bg-white'}`}>
          <div className="relative">
            <img src={lesson.image} className='object-cover w-full rounded-t-lg aspect-video' />
            { (lessonUser && lessonUser.progress === 100) && (
              <div className="absolute flex flex-row items-center justify-center px-3 py-1 space-x-2 text-green-600 bg-green-100 border border-green-700 rounded-full top-2 right-2">
                <AiFillCheckCircle />
                <span className="text-xs">Completado</span>
              </div>
            ) }
            <div className='w-full h-1 bg-white'>
              <div className={`w-full h-full ${lessonUser?.progress === 100 ? 'bg-green-600' : 'bg-indigo-500'}`} style={{ width: `${lessonUser?.progress ?? 0}%` }}></div>
            </div>
          </div>
          <div className="px-2 py-3 text-sm">{lesson.name}</div>
        </div>
      </a>
    </Link>
  )
}
