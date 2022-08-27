import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { AiFillCheckCircle } from 'react-icons/ai'

export const CorrectAnswer = () => {
  useEffect(() => {
    const snd = new Audio("/right_soung.wav"); // buffers automatically when created
    snd.play();
    // setTimeout(() => {
    //   setShowAnswer(true)
    //   textToSpeak(vocabulary.wordEnglish)
    // }, 700)
  }, [])

  return (
    <div className='w-full'>
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
        <AiFillCheckCircle color='green' size={140} />
      </motion.div>
    </div>
  </div>
  )
}
