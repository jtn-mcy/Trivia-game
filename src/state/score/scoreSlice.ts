import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const scoreSlice = createSlice({
  name: "score",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
    decrement: state => {
      state.value -= 1
    },
    reset: state => {
      state.value = 0
    }
  }
})

export const { increment, decrement, reset } = scoreSlice.actions

export default scoreSlice.reducer