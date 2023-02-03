import { createSlice } from "@reduxjs/toolkit";
import { Steps } from "../../types";

const initialState: Steps = {
  stepFirst: true,
  stepSecond: false,
  stepThird: false,
};

const postStepsSlice = createSlice({
  name: "postSteps",
  initialState,
  reducers: {
    showStepFirst(state) {
      state.stepFirst = true;
      state.stepSecond = false;
      state.stepThird = false;
    },
    showStepSecond(state) {
      state.stepFirst = false;
      state.stepSecond = true;
      state.stepThird = false;
    },
    showStepThird(state) {
      state.stepFirst = false;
      state.stepSecond = false;
      state.stepThird = true;
    },
  },
});

export const { showStepFirst, showStepSecond, showStepThird } =
  postStepsSlice.actions;

export default postStepsSlice.reducer;
