import { allData } from "../data";
import { Question, QuestionCategory } from "../types";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../state/store';

export const useGetRandomQuestions: (numQuestions: number, category: QuestionCategory | 'all') => Question[] = (numQuestions, category) => {
  let flag = 0;
  const questions: Question[] = [];
  const data = category !== 'all' ? allData.filter(question => question.category === category) : allData;
  while (flag < numQuestions) {
    const questionToAdd = data[Math.floor(Math.random() * data.length)]

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

export const useGetCategories: () => QuestionCategory[] = () => {
  return Object.values(QuestionCategory)
}

export const useGetNumberOfCategoryQuestions: (category: QuestionCategory | 'all') => number = (category) => {
  let length: number
  category === 'all'
    ? length = allData.length
    : length = allData.filter(question => question.category === category).length
  return length
}

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;