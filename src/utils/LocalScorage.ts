import { Score } from '../api';

export const getAppStartupScores: () => void = () => {
  localStorage.getItem('quiz-scores') === null && localStorage.setItem('quiz-scores', JSON.stringify([]));
};

export const recordScores: (userScore: Score ) => void = ( userScore) => {
  let localScorage: Score[] | [] = JSON.parse(localStorage.getItem('quiz-scores') || "[]");
  localScorage = [...localScorage, userScore];
  localScorage.sort((a, b) => b.score - a.score );
  localStorage.setItem('quiz-scores', JSON.stringify(localScorage));
};

export const getLocalScorage: () => Score[] | [] = () => {
  let localScorage: Score[] | [] = JSON.parse(localStorage.getItem('quiz-scores') || "[]");
  return localScorage;
};

export const generateID: () => string = () => {
  return String(Date.now().toString(32) + Math.random().toString(16)).replace(/\./, '');
};

export const getFormattedDate: () => string = () => {
   var result="";
   var d = new Date();
   result += `${d.getFullYear()}/${(d.getMonth()+1)}/${d.getDate()}`;
   return result;
};