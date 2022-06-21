import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../state/store'
import questions from '../questions.json'

export type Question = {
  id: string,
  type: string,
  question: string,
  answers: string[],
  correct_answer: string | string[]
  value: number
}

export type QuestionsJSON = Question[]

const questionsJSON: QuestionsJSON = questions

export const useGetRandomQuestion = () => {
  return questionsJSON[Math.floor(Math.random() * questionsJSON.length)]
}

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;