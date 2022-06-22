import React, { useEffect, useState } from 'react'
import Button from '../../components/Button'
import { getLocalScorage } from '../../utils/LocalScorage'

export type Score = {
  userName: string,
  score: number
}

type Scores = Score[] | []

const HighScores:React.FC = () => {
  const [scores, setScores] = useState<Scores>([]);
  
  useEffect(() => {
    setScores(getLocalScorage())
    }, [scores])

  const handleResetScorage = () => {
    localStorage.setItem('quiz-scores', '[]')
    setScores(getLocalScorage())
  }

  return (
    <div>
      <ul>
        <h2><u>High Scores</u></h2>
        {scores.length 
          ? scores.map(score => <li key={score.userName}>{score.userName}: {score.score}</li>)
          : <li>No scores recorded!</li>}
      </ul>
      <Button text='Clear high scores!' btnType='Play' onClick={handleResetScorage}/>
    </div>
  )
}

export default HighScores