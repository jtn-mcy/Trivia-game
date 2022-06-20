import { createSlice } from "@reduxjs/toolkit";

export const questionSlice = createSlice({
  name: "question",
  initialState: {
    inPlay: false,
    value: 1,
  },
  reducers: {
    increment: state => {
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    togglePlay: state => {
      state.inPlay = !state.inPlay
    }
  }
})

export const { increment, decrement, togglePlay } = questionSlice.actions

export default questionSlice.reducer