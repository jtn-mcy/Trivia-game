import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../state/store'
import * as questions from '../questions.json'

export type Score = {
  id: string
  userName: string
  score: number
  date: string
}

export type Scores = Score[]

export enum QuestionType {
  single = "single",
  multiple = "multiple"
}

export type Question = {
  id: string,
  type: QuestionType | string
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

export const useGetRandomQuestions: ( numQuestions: number ) => Question[] = (numQuestions) => {
  let flag = 0;
  const questions: Question[] = [];
  while (flag < numQuestions) {
    const questionToAdd = questionsJSON[Math.floor(Math.random() * questionsJSON.length)]
    if (!questions.includes(questionToAdd)) {
      questions.push(questionToAdd)
      flag++
    }
  }

  return questions
}

export const useGetCurrentQuestion: () => Question = () => {
  const questions = useAppSelector(state => state.question.questions)
  const index = useAppSelector(state => state.question.index)

  return questions[index]
}

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;