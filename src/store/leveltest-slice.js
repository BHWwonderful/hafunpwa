// hooks
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// custom hooks
import fetchLevelTestImgFromFireStorage from "../api/fetchLevelTestImgFromFireStorage";
import fetchLevelTestDataFromFireBase from "../api/leveltestApi";
import shuffleArray from "../api/shuffleArray";

export const fetchLevelTestData = createAsyncThunk('leveltest/fetchLevelTestData', async (userLevel) => {
  const levelTestDataFromFireBase = await fetchLevelTestDataFromFireBase(userLevel);
  const shuffledLevelTestData = shuffleArray(levelTestDataFromFireBase);
  return shuffledLevelTestData;
})

export const fetchLevelTestImageUrl = createAsyncThunk('leveltest/fetchLevelTestImageUrl', async (img) => {
  const levelTestImageUrlFromFireBase = await fetchLevelTestImgFromFireStorage(img);
  return levelTestImageUrlFromFireBase
})

const initialLevelTestState = {
  userLevel: "beginner",
  currentPoint : 0,
  currentAnswer: "",
  currentChoice: "",
  currentImage:"",
  totalPoint : 0,
  totalLevelTestData: [],
  currentLevelTestData: [],
  currentQuestionIndex: 0,
  clickedChoiceIndex: null,
  dataStatus: "idle",
  imageDataStatus: "idle",
  error: null,
  isResultShow: false,
}

const levelTestSlice = createSlice({
  name: "leveltest",
  initialState: initialLevelTestState,
  reducers:{
    changeCurrentAnswer(state, action){
      state.currentAnswer = action.payload;
    },
    resetCurrentAnswer(state){
      state.currentAnswer = "";
    },
    addQuestionIndex(state){
      state.currentQuestionIndex = state.currentQuestionIndex + 1; 
    },
    pushCurrentTestData(state, action){
      state.currentLevelTestData = [...state.currentLevelTestData, action.payload];
    },
    resetLevelTestData(state){
      state.totalLevelTestData = [];
      state.currentLevelTestData = [];
      state.totalPoint = 0;
      state.currentAnswer = "";
      state.currentChoice = "";
      state.currentImage = "";
      state.currentQuestionIndex = 0;
      state.userLevel = "beginner";
      state.clickedChoiceIndex = null;
      state.dataStatus= "idle";
      state.imageDataStatus= "idle";
    },
    resetTestData(state){
      state.totalLevelTestData = [];
      state.currentLevelTestData = [];
    },
    resetClickedChoiceIndex(state){
      state.clickedChoiceIndex = null;
    },
    resetCurrentImage(state){
      state.currentImage="";
    },
    resetDataStatus(state){
      state.dataStatus = "idle";
    },
    resetUserLevel(state){
      state.userLevel = "beginner";
    },
    resetIsResultShow(state){
      state.isResultShow = false;
    },
    changeCurrentAnswer(state, action){
      state.currentAnswer = action.payload;
    },
    changeCurrentChoice(state, action){
      state.currentChoice = action.payload;
    },
    changeClickedChoiceIndex(state, action){
      state.clickedChoiceIndex = action.payload;
    },
    changeCurrentImage(state, action){
      state.currentImage = action.payload;
    },
    changeCurrentPoint(state, action){
      state.currentPoint = action.payload;
    },
    changeUserLevel(state, action){
      state.userLevel = action.payload
    },
    changeIsResultShow(state){
      state.isResultShow = true;
    },
    addTotalPoint(state, action){
      state.totalPoint = state.totalPoint + action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLevelTestData.pending, (state) => {
      state.dataStatus = 'loading';
    })
    builder.addCase(fetchLevelTestData.fulfilled, (state, action) => {
      state.dataStatus = 'succeeded';
      state.totalLevelTestData = [...state.totalLevelTestData, ...action.payload]
    })
    builder.addCase(fetchLevelTestData.rejected, (state, action) => {
      state.dataStatus = 'failed';
      state.error = action.error.message;
    })
    builder.addCase(fetchLevelTestImageUrl.pending, (state) => {
      state.imageDataStatus = 'loading';
    })
    builder.addCase(fetchLevelTestImageUrl.fulfilled, (state, action) => {
      state.imageDataStatus = 'succeeded';
      state.currentImage = action.payload;
    })
    builder.addCase(fetchLevelTestImageUrl.rejected, (state, action) => {
      state.imageDataStatus = 'failed';
      state.error = action.error.message;
    })
  }
})

export const levelTestActions = levelTestSlice.actions;

export default levelTestSlice;