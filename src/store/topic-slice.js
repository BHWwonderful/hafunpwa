// hooks
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, where, query, getDocs } from "firebase/firestore/lite";
import db from "../Firebase-config";

export const fetchTopicDataByLevel = createAsyncThunk('topic/fetchTopicDataByLevel', async (level) => {
  if (level === "all"){
    const q = query(collection(db, 'topic'));
    const querySnapshot = await getDocs(q);
    const dataFromFirebase = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return dataFromFirebase;
  } else {
    const q = query(collection(db, 'topic'), where("level", "==", level));
    const querySnapshot = await getDocs(q);
    const dataFromFirebase = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return dataFromFirebase;
  }
})

export const fetchTopicDataByKeyword = createAsyncThunk('topic/fetchTopicDataByKeyword', async (keyword) => {
  if (keyword.trim() === ""){
    return [];
  } else {
    const q = query(collection(db, 'topic'));
    const querySnapshot = await getDocs(q);
    const dataFromFirebase = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const filteredDataFromFirebase = dataFromFirebase.filter((data) => {
      return data.title.toLowerCase().startsWith(keyword.toLowerCase());
    })
    return filteredDataFromFirebase;
  }
})

const initialTopicState = {
  currentLevel: "all",
  filteredData: [],
  dataStatus: "idle",
  error: null,
}

const topicSlice = createSlice({
  name: "topic",
  initialState: initialTopicState,
  reducers: {
    changeCurrentLevel(state, action){
      state.currentLevel = action.payload;
    },
    resetCurrentLevel(state){
      state.currentLevel = "all"
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTopicDataByLevel.pending, (state) => {
      state.dataStatus = 'pending';
    })
    builder.addCase(fetchTopicDataByLevel.fulfilled, (state, action) => {
      state.dataStatus = 'fulfilled';
      state.filteredData = action.payload;
    });
    builder.addCase(fetchTopicDataByLevel.rejected, (state, action) => {
      state.dataStatus = 'rejected';
      state.error = action.error.message;
    })
    builder.addCase(fetchTopicDataByKeyword.pending, (state) => {
      state.dataStatus = 'pending';
    })
    builder.addCase(fetchTopicDataByKeyword.fulfilled, (state, action) => {
      state.dataStatus = 'fulfilled';
      state.filteredData = action.payload;
    })
    builder.addCase(fetchTopicDataByKeyword.rejected, (state, action) => {
      state.dataStatus = 'rejected';
      state.error = action.error.message;
    })
  }
})

export const topicActions = topicSlice.actions;

export default topicSlice;