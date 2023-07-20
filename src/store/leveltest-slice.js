import { createSlice } from "@reduxjs/toolkit";

const initialLevelTestSlice = {
  userLevel: "beginner",
  currentPoint : 0,
  levelTestQuestions : [],
  dataStatus: "idle",
  error: null,
}

const levelTestSlice = createSlice({
  name: "leveltest",
  initialState: initialLevelTestSlice,
  reducers:{

  },
})

export const levelTestActions = levelTestSlice.actions;

export default levelTestSlice;