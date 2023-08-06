// hooks
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { useEffect } from "react";
import React from "react";

// redux store
import store from "./store";

// Components
import Home from "./pages";
import Topic from "./pages/topic";
import Lifestyle from "./pages/lifestyle";
import GlobalStyle from "./GlobalStyles";
import Qna from "./pages/qna";
import Profile from "./pages/profile";
import LevelTest from "./pages/leveltest";
import TopicSearchPage from "./pages/topic/search";
import TopicDetailPage from "./pages/topic/detail";
import TopicLessonPage from "./pages/topic/detail/lesson";
import LogInPage from "./pages/login";


function App() {

  function setScreenSize(){
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  useEffect(() => {
    setScreenSize();
    window.addEventListener('resize', setScreenSize);

    return () => window.removeEventListener('resize', setScreenSize);
  }, [])

  return (
    <>
      <Provider store={store}>
        <GlobalStyle />
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/topic" element={<Topic />} />
              <Route path="/topic/search" element={<TopicSearchPage />} />
              <Route path="/topic/detail/:id" element={<TopicDetailPage/>} />
              <Route path="/topic/detail/:id/lesson/:lesson" element={<TopicLessonPage />} />
              <Route path="/lifestyle" element={<Lifestyle />} />
              <Route path="/qna" element={<Qna />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/leveltest/" element={<LevelTest />} />
              <Route path="/login" element={<LogInPage />} />
            </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
