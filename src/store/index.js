// hooks
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import fireStoreApi from "../api/fireStoreApi";


// slices
import topicSlice from "./topic-slice";
import levelTestSlice from "./leveltest-slice";

// api hook

const store = configureStore({
  reducer: {
    topic: topicSlice.reducer,
    levelTest: levelTestSlice.reducer,
    [fireStoreApi.reducerPath]: fireStoreApi.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(fireStoreApi.middleware),
})

setupListeners(store.dispatch);


export default store;
