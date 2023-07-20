// hooks
import { configureStore } from "@reduxjs/toolkit";

// slices
import topicSlice from "./topic-slice";
import levelTestSlice from "./leveltest-slice";

const store = configureStore({
  reducer: {
    topic: topicSlice.reducer,
    levelTest: levelTestSlice.reducer,
  }
})

export default store;
