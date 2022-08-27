import React, { createContext } from "react";
import { useLesson } from "../hooks/useLesson";

interface LessonContextProps {
  currentVocabulary: any;
  exerciseType: string;
  handleVocabulary: (e: any) => void;
  setAnswer: (answer: string) => void;
  answer: string;
  score: number;
  statusAnswer: "correct" | "incorrect" | "none";
  totalAnswers: number;
  countDown: number;
  numOfQuestions: number;
  lessonStatus: "started" | "finished" | "losed";
  lesson: any;
  correctWords: any;
  wrongWords: any;
}

const lessonContext = createContext<LessonContextProps>({});

export const LessonProvider = ({
  children,
  lesson,
}: {
  children: React.ReactElement;
  lesson: any;
}) => {
  const {
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
    correctWords,
    wrongWords,
  } = useLesson({ lesson });

  return (
    <lessonContext.Provider
      value={{
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
        lesson,
        correctWords,
        wrongWords,
      }}
    >
      {children}
    </lessonContext.Provider>
  );
};

export const useLessonContext = () => {
  const context = React.useContext(lessonContext);
  return context;
};
