import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const scoreSlice = createSlice({
  name: "score",
  initialState: {
    value: 0,
    questions_correct: 0
  },
  reducers: {
    increment: (state, action: PayloadAction<number>) => {
      state.value += action.payload
      state.questions_correct++
    },
    decrement: state => {
      state.value -= 1
    },
    reset: state => {
      state.value = 0
      state.questions_correct = 0
    }
  }
});

export const { increment, decrement, reset } = scoreSlice.actions;

export default scoreSlice.reducer;