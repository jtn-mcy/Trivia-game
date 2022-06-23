import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../state/store';
import data from '../data';


export type Score = {
  id: string;
  userName: string;
  score: number;
  date: string;
};

export type Scores = Score[];

export enum QuestionType {
  single = "single",
  multiple = "multiple",
};

export enum QuestionCategory {
  math = "math",
  sports = "sports",
  science = "science",
  potpourri = "potpourri"
};

export type Question = {
  id: string;
  type: QuestionType;
  category: QuestionCategory;
  question: string;
  answers: string[];
  correct_answer: string | string[];
  value: number;
};

const allData = {
  ...data.mathData,
  ...data.potpourriData,
  ...data.scienceData,
  ...data.sportsData
};

export const useGetRandomQuestions: ( numQuestions: number ) => Question[] = (numQuestions) => {
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