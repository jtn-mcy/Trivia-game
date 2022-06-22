import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Question } from "../../api";

type questionState = {
  inPlay: boolean
  index: number
  questions: Question[]
}

export const questionSlice = createSlice({
  name: "question",
  initialState: {
    inPlay: false,
    index: 0,
    questions: []
  } as questionState,
  reducers: {
    increment: state => {
      state.index += 1
    },
    decrement: state => {
      state.index -= 1
    },
    reset: state => {
      state.index = 0
    },
    togglePlay: state => {
      state.inPlay = !state.inPlay
    },
    addQuestions: (state, action: PayloadAction<Question[]>) => {
      state.questions = action.payload
    },
    clearQuestions: state => {
      state.questions = []
    }
  },
})

export const { increment, decrement, togglePlay, addQuestions, clearQuestions, reset } = questionSlice.actions

export default questionSlice.reducer