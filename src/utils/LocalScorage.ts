import { Score } from '../types';

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
  let result = "";
  let d = new Date();
  let hours: string | number = d.getHours();
  hours = hours > 12 ? hours - 12 : hours;
  let minutes: string | number = d.getMinutes();
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  result += `${d.getFullYear()}/${
    d.getMonth() + 1
  }/${d.getDate()} ${hours}:${minutes} ${d.getHours() < 12 ? "am" : "pm"}`;
  return result;
};