import { allData } from "../data";
import { Question } from "../types";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../state/store';

export const useGetRandomQuestions: (numQuestions: number) => Question[] = (numQuestions) => {
  let flag = 0;
  const questions: Question[] = [];
  while (flag < numQuestions) {
    const questionToAdd = allData[Math.floor(Math.random() * allData.length)];
    if (!questions.includes(questionToAdd)) {
      questions.push(questionToAdd);
      flag++;
    };
  };

  return questions;
};

export const useGetCurrentQuestion: () => Question = () => {
  const questions = useAppSelector(state => state.question.questions);
  const index = useAppSelector(state => state.question.index);

  return questions[index];
}

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;