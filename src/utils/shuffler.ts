import { Question } from "../types";

export const shuffleArray: (arr: Question[]) => Question[] = (arr) => {
  const newArr = [...arr];
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};
