import React, { useEffect, useRef } from "react"
import { useLessonContext } from "../../../context/LessonContext"

export const LessonQuestionWrite = ({ vocabulary }: { vocabulary: any }) => {

  const ref = useRef<any>(null)
  const { setAnswer, answer, statusAnswer } = useLessonContext()

  useEffect(() => {
    if (vocabulary && ref.current) {
      ref.current.focus()
    }
  }, [vocabulary])


  return (
    <div className="flex flex-col flex-1 w-full">
      <p className="text-slate-500">Escribe la trauduccion correcta</p>
      <div className="flex flex-col items-center justify-between w-full py-12 space-y-12 text-center">
        <div className="grid grid-cols-3 place-items-center h-44">
          <h2 className="col-span-2 text-5xl capitalize">{vocabulary?.wordSpanish}</h2>
          <img src={vocabulary?.image} className='object-cover h-48 rounded-lg shadow-lg aspect-video' />
        </div>
        <input
          onChange={(e) => setAnswer(e.target.value)}
          ref={ref}
          autoFocus={true}
          value={answer}
          className={`w-full px-4 py-4 text-2xl bg-white border border-indigo-800 rounded-lg shadow-md`}
        />
      </div>
    </div>
  )
}
