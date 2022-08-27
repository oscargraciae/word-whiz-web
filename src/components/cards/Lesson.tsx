import Link from "next/link";
import React from "react";
import { colorByProgress } from "../../utils/progress-color";

export const Lesson = ({ lesson }: { lesson: any }) => {
  return (
    <Link href={`/lesson/introduction/${lesson.id}`}>
      <a>
        <div className="flex flex-col grid-flow-col mx-2 mb-4 bg-white border rounded-lg hover:shadow-lg lesson-card-transition">
          <div>
            <img src={lesson.image} className='object-cover w-full rounded-t-lg aspect-video' />
            <div className='w-full h-1 bg-gray-200'>
              <div className={`w-full h-full bg-indigo-500`} style={{ width: `${70}%` }}></div>
            </div>
          </div>
          <div className="px-2 py-3 text-sm">{lesson.name}</div>
        </div>
      </a>
    </Link>
  )
}
