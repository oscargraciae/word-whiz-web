import React, { useEffect } from "react"
import { useLessonContext } from "../../../context/LessonContext"
import { textToSpeak } from "../../../utils/text-to-speak"

export const LessonImageSound = ({ vocabulary }: { vocabulary: any }) => {

  const { setAnswer, answer, statusAnswer } = useLessonContext()

  useEffect(() => {
    textToSpeak(vocabulary.wordEnglish)
  }, [vocabulary])

  return (
    <div className="flex flex-col flex-1 w-full">
      <p className="text-slate-500">Escribe la trauduccion correcta</p>
      <div className="flex flex-col items-center justify-between w-full py-12 space-y-12 text-center">
        <div className="flex items-center justify-center h-44">
          <img src={vocabulary?.image} className='object-cover h-48 rounded-lg aspect-video' />
        </div>
        <input
          onChange={(e) => setAnswer(e.target.value)}
          value={answer}
          autoFocus
          className={`w-full px-4 py-4 text-2xl bg-white border border-indigo-800 rounded-lg shadow-md`}
        />
      </div>
    </div>
  )
}
