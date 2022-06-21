import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../api';

const Score: React.FC = () => {
  const score = useAppSelector(state => state.score.value);
  const question = useAppSelector(state => state.question)
  const [isPlaying, setIsPlaying] = useState(question.inPlay)

  useEffect(() => {
    setIsPlaying(question.inPlay)
  }, [question])

  return (
    isPlaying ? (
      <>
        <h2>Score: {score}</h2>
        <h2>Question {question.index + 1} out of {question.questions.length} </h2>
      </>
    ) : (
      <>
        <h2>Welcome to Indeed Trivia!</h2>
        <h2>Press play to start!</h2>
      </>
    )
  )
}

export default Score