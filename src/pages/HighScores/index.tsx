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
  const [warning, setWarning] = useState<boolean>(false)
  
  useEffect(() => {
    setScores(getLocalScorage())
    }, [])

  const handleResetScorage = () => {
    setWarning(false);
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
      {!warning ? (
          <Button 
            text='Clear high scores'
            btnType='Play'
            onClick={() => setWarning(true)}
            disabled={!scores.length}/>
          ) : (
            <Button 
              text='Really clear high scores?' 
              btnType='Abandon' 
              onClick={handleResetScorage} 
              onMouseLeave={() => setWarning(false)}/>
          ) 
      }
    </div>
  )
}

export default HighScores