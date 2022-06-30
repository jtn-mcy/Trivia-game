import { allData } from "../data";
import { Question, QuestionCategory } from "../types";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../state/store';
import { shuffleArray } from "../utils/shuffler";

export const getRandomQuestions: (
  numQuestions: number,
  category: QuestionCategory | "all"
) => Question[] = (numQuestions, category) => {
  let questions: Question[] =
    category !== "all"
      ? allData.filter((question) => question.category === category)
      : allData;
  questions = shuffleArray(questions);

  return questions.slice(0, numQuestions);
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