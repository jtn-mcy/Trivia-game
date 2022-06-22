import { Score } from '../api'

export const appStartupScores: () => void = () => {
  localStorage.getItem('quiz-scores') === null && localStorage.setItem('quiz-scores', JSON.stringify([]))
}

export const recordScores: (userScore: Score ) => void = ( userScore) => {
  let localScorage: Score[] | [] = JSON.parse(localStorage.getItem('quiz-scores') || "[]")
  localScorage = [...localScorage, userScore]
  localScorage.sort((a, b) => a.score - b.score )
  localStorage.setItem('quiz-scores', JSON.stringify(localScorage));
}

export const getLocalScorage: () => Score[] | [] = () => {
  let localScorage: Score[] | [] = JSON.parse(localStorage.getItem('quiz-scores') || "[]")
  return localScorage
}