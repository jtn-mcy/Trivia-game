import React, { useEffect, useState } from 'react'

type Score = {
  name: string
  score: number
} 

type Scores = Score[] | []

const HighScores:React.FC = () => {
  const [scores, setScores] = useState<Scores>([]);
  
  useEffect(() => {
    const localScore = localStorage.getItem('quiz-scores');
    if (localScore) setScores(JSON.parse(localScore))
    else {
      localStorage.setItem('quiz-scores', JSON.stringify([]))
    }}, [])

  return (
    <div>
      <ul>
        <h2><u>High Scores</u></h2>
        {scores.length 
          ? scores.map(score => <li key={score.name}>{score.name}: {score.score}</li>)
          : <li>No scores recorded!</li>}
      </ul>
    </div>
  )
}

export default HighScores