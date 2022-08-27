import React, { useEffect } from 'react'
import { useLessonContext } from '../../../context/LessonContext'
import { getExerciseOptions } from '../../../utils/random-values-array'
import { textToSpeak } from '../../../utils/text-to-speak'

export const LessonQuestionChoice = ({ vocabulary }: { vocabulary: any }) => {
  const { setAnswer, answer, statusAnswer, lesson } = useLessonContext()

  const [options, setOptions] = React.useState<any[]>([])

  useEffect(() => {
    if (vocabulary) {
      const values = getExerciseOptions(lesson.vocabulary, vocabulary?.wordEnglish)
      setOptions([...values, vocabulary?.wordEnglish].sort())
    }
  }, [vocabulary])

  return (
    <div className="flex flex-col flex-1 w-full">
      <p className="text-slate-500">Selecciona la respuesta correcta</p>
      <div className="flex flex-col items-center justify-between w-full py-12 space-y-12 text-center">
        <div className="grid grid-cols-3 place-items-center h-44">
          <h2 className="col-span-2 text-5xl capitalize">{vocabulary?.wordSpanish}</h2>
          <img src={vocabulary?.image} className='object-cover h-48 rounded-lg aspect-video' />
        </div>

        <div className='grid w-full grid-cols-2 gap-4'>
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => {
                setAnswer(option)
                textToSpeak(option)
              }}
              className={`flex flex-col shadow-lg items-center justify-center w-full h-full py-6 text-indigo-800 bg-white border border-indigo-800 rounded-lg cursor-pointer hover:bg-indigo-100 ${answer === option ? 'bg-blue-200 text-blue-600' : ''}`}>
              <span className='font-semibold capitalize'>{option}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
