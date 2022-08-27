import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { AiFillCloseCircle, AiFillSound } from 'react-icons/ai'
import { textToSpeak } from '../../utils/text-to-speak'

export const WrongAnswer = ({ vocabulary }: { vocabulary: any }) => {
  const [showAnwer, setShowAnswer] = React.useState<boolean>(false)

  useEffect(() => {
    const snd = new Audio("/wrong_sound.wav"); // buffers automatically when created
    snd.play();
    setTimeout(() => {
      setShowAnswer(true)
      textToSpeak(vocabulary.wordEnglish)
    }, 700)
  }, [])

  return (
    <div className='w-full'>
      { showAnwer
        ? (
          <div className="container flex flex-row items-center justify-between w-2/3 h-screen py-12 mx-auto">
            <div className='flex flex-col items-start justify-between flex-1 space-y-6'>
              <div className='space-y-1'>
                <span className='text-gray-500'>Inglés</span>
                <h3 className='text-5xl capitalize'>
                  {vocabulary.wordEnglish}
                  <button onClick={() => textToSpeak(vocabulary.wordEnglish)} className='p-2 ml-4 text-white bg-indigo-500 rounded-full'>
                    <AiFillSound size={18} />
                  </button>
                </h3>
              </div>
              <div className='space-y-1'>
                <span className='text-gray-500'>Español</span>
                <h4 className='text-xl capitalize'>{vocabulary.wordSpanish}</h4>
              </div>
            </div>
            <div>
              <img src={vocabulary.image} className='object-cover h-48 rounded-lg shadow-lg aspect-video' />
            </div>
          </div>
        )
        : (
          <div className='flex items-center justify-center w-full h-full'>
            <motion.div
              className='flex flex-col items-center justify-center w-full h-full'
              initial={{ scale: 0 }}
              transition={{
                scale: { type: 'spring', stiffness: 100, damping: 15 }
              }}
              animate={{ scale: 1 }}
              exit={{ scale: 1 }}
            >
              <AiFillCloseCircle color='red' size={140} />
            </motion.div>
          </div>
        )
        }

    </div>
  )
}
