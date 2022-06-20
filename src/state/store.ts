import { configureStore } from '@reduxjs/toolkit'
import scoreReducer from './score/scoreSlice'
import questionReducer from './questions/questionSlice'

export const store = configureStore({
  reducer: {
    score: scoreReducer,
    question: questionReducer
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;