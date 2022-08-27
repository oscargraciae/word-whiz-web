import React, { useEffect } from 'react'
import { trpc } from '../utils/trpc'

type TypeExerciseType = 'choice' | 'write'

export const useLesson = ({ lesson }: { lesson: any }) => {
  const [score, setScore] = React.useState<number>(0)
  const [currentVocabulary, setCurrentVocabulary] = React.useState<any>(null)
  const [exerciseType, setExerciseType] = React.useState<'choice' | 'write' | 'image-sound'>('choice') // 'choice' | 'write'
  const [answer, setAnswer] = React.useState<string>('')
  const [statusAnswer, setStatusAnswer] = React.useState<'correct' | 'incorrect' | 'none'>('none')
  const [totalAnswers, setTotalAnswers] = React.useState<number>(1)
  const [countDown, setCountDown] = React.useState<number>(15)
  const [numOfQuestions, setNumOfQuestions] = React.useState<number>(15)
  const [lessonStatus, setLessonStatus] = React.useState<'started' | 'finished' | 'losed'>('started')
  const [wrongWords, setWrongWords] = React.useState<any>({})
  const [correctWords, setCorrectWords] = React.useState<any>({})

  const vocavularyLearnedMutation = trpc.useMutation('vocabulary_learned.create')

  useEffect(() => {
    if (lesson && lessonStatus === 'started') {
      const type = getExcericeType()
      const nextVocabulary = getVocabulary(lesson.vocabulary)

      setExerciseType(type)
      setCurrentVocabulary(nextVocabulary)
    }
  }, [])

  useEffect(() => {
    setStatusAnswer('none')
  }, [currentVocabulary])

  useEffect(() => {
    const interval = setInterval(() => {
      if (countDown > 0) {
        setCountDown(countDown - 1)
      } else {
        setCountDown(20)
        handleIncorrectAnswer()
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countDown]);

  useEffect(() => {
    if (totalAnswers > numOfQuestions) {
      setLessonStatus('finished')
    }
  }, [totalAnswers])

  const getExcericeType = (): TypeExerciseType => {
    const types = ['choice', 'write', 'image-sound']
    return types[Math.floor(Math.random() * types.length)] as TypeExerciseType
  }

  const getVocabulary = (vocabulary: any): any => {

    const vocabularyIntermediate = vocabulary.filter((item: any) => item.vocabularyLerned[0].progress < 100)
    const vocabularyHard = vocabulary.filter((item: any) => item.vocabularyLerned[0].progress < 50)

    const vocabularyList = [...vocabulary, ...vocabularyIntermediate, ...vocabularyIntermediate, ...vocabularyHard, ...vocabularyHard, ...vocabularyHard]

    console.log('vocabularyList', vocabularyList)

    const randomIndex = Math.floor(Math.random() * vocabularyList.length)
    return vocabularyList[randomIndex]
  }

  const handleVocabulary = (e) => {
    e.preventDefault()
    checkAnswer()
  }

  const nextVocabulary = () => {
    if (lesson && currentVocabulary && totalAnswers < numOfQuestions) {
      setExerciseType(getExcericeType())
      setCurrentVocabulary((getVocabulary(lesson.vocabulary)))
    }
  }

  const handleCorrectAnswer = () => {
    setCountDown(15)
    setStatusAnswer('correct')
    setScore(score + countDown)
    setTotalAnswers(totalAnswers + 1)

    // vocavularyLearnedMutation.mutate()

    setTimeout(() => {
      nextVocabulary()
      setStatusAnswer('none')
      setCountDown(15)
    }, 1000)
  }

  const handleIncorrectAnswer = () => {
    setCountDown(15)
    setStatusAnswer('incorrect')
    const newScore = score - 10
    if (newScore > 0) {
      setScore(newScore)
    } else {
      setScore(0)
    }
    setTimeout(() => {
      nextVocabulary()
      setStatusAnswer('none')
      setCountDown(15)
      setTotalAnswers(totalAnswers + 1)
    }, 3000)
  }

  const checkAnswer = () => {
    const _answer = answer.toLowerCase()
    if (currentVocabulary && currentVocabulary.wordEnglish === _answer) {
      if (correctWords[currentVocabulary.wordEnglish]) {
        setCorrectWords({ ...correctWords, [currentVocabulary.wordEnglish]: { ...currentVocabulary, total: (correctWords[currentVocabulary.wordEnglish].total + 1) }  })
      } else {
        setCorrectWords({ ...correctWords, [currentVocabulary.wordEnglish]: { ...currentVocabulary, total: 1 } })
      }
      vocavularyLearnedMutation.mutate({ vocabularyId: currentVocabulary.id, status: 'correct', lessonId: lesson.id })
      handleCorrectAnswer()
    } else if (currentVocabulary) {
      if (wrongWords[currentVocabulary.wordEnglish]) {
        setWrongWords({ ...wrongWords, [currentVocabulary.wordEnglish]: { ...currentVocabulary, total: (wrongWords[currentVocabulary.wordEnglish].total + 1) }  })
      } else {
        setWrongWords({ ...wrongWords, [currentVocabulary.wordEnglish]: { ...currentVocabulary, total: 1 } })
      }
      vocavularyLearnedMutation.mutate({ vocabularyId: currentVocabulary.id, status: 'incorrect', lessonId: lesson.id })
      handleIncorrectAnswer()
    }
    setAnswer('')
  }

  return {
    currentVocabulary,
    handleVocabulary,
    exerciseType,
    setAnswer,
    answer,
    score,
    statusAnswer,
    totalAnswers,
    countDown,
    numOfQuestions,
    lessonStatus,
    wrongWords,
    correctWords,
  }

}
