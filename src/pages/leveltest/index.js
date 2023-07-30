// CSS
import styles from "./leveltest.module.css"

// Components
import GoToHomeButton from "../../components/ui/buttons/GoToHomeButton";
import Progressbar from "../../components/ui/bar/ProgressBar";
import RenderTestContent from "../../components/RenderTestContent";
import SubmitTestData from "../../components/SubmitTestData";
import TestResult from "../../components/TestResult";
import Loading from "../../components/Loading";

// hooks
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

// async hooks
import { fetchLevelTestData } from "../../store/leveltest-slice";

// actions
import { levelTestActions } from "../../store/leveltest-slice";

function LevelTest(){

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const userLevel = useSelector((state) => state.levelTest.userLevel);
  const currentAnswer = useSelector((state) => state.levelTest.currentAnswer);
  const currentChoice = useSelector((state) => state.levelTest.currentChoice);
  const currentImage = useSelector((state) => state.levelTest.currentImage);
  const currentPoint = useSelector((state) => state.levelTest.currentPoint);
  const totalPoint = useSelector((state) => state.levelTest.totalPoint);
  const totalLevelTestData = useSelector((state) => state.levelTest.totalLevelTestData);
  const currentLevelTestData = useSelector((state) => state.levelTest.currentLevelTestData);
  const currentQuestionIndex = useSelector((state) => state.levelTest.currentQuestionIndex);
  const clickedChoiceIndex = useSelector((state) => state.levelTest.clickedChoiceIndex);
  const dataStatus = useSelector((state) => state.levelTest.dataStatus);
  const imageDataStatus = useSelector((state) => state.levelTest.imageDataStatus);
  const isResultShow = useSelector((state) => state.levelTest.isResultShow);

  useEffect(() => {
    dispatch(levelTestActions.resetUserLevel());
    dispatch(levelTestActions.resetLevelTestData());
    dispatch(fetchLevelTestData("beginner"));
    return () => {
      dispatch(levelTestActions.resetLevelTestData());
      dispatch(levelTestActions.resetIsResultShow());
    }
  }, [])

  useEffect(() => {
    if (userLevel !== "beginner"){
      dispatch(fetchLevelTestData(userLevel));
    } 
  }, [userLevel])

  useEffect(() => {
    if(dataStatus === 'succeeded'){
      const newData = totalLevelTestData[currentQuestionIndex];
      dispatch(levelTestActions.pushCurrentTestData(newData));
    }
  }, [currentQuestionIndex, totalLevelTestData])

  useEffect(() => {
    if(dataStatus === 'succeeded'){
      const loadingTimer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [dataStatus])

  // currentLevelTestData.length === 0 || totalLevelTestData.length === 0 || dataStatus === "loading"

  if(isLoading){
    return(
      <Loading />
    )
  } else {

    return(
      <div className={styles.wrap}>
        <header className={styles.header}>
          <div className={styles.leftchild}>
            <GoToHomeButton />
          </div>
          <div className={styles.rightchild}>
            <Progressbar
              totalContent={totalLevelTestData}
              currentContent={currentLevelTestData}
              userLevel={userLevel}
            />
          </div>
        </header>
        {isResultShow ? 
        <TestResult /> : 
        <>
          <section className={styles.question}>
            <RenderTestContent
              currentLevelTestData={currentLevelTestData}
              clickedChoiceIndex={clickedChoiceIndex}
              currentImage={currentImage}
              dataStatus={dataStatus}
              imageDataStatus={imageDataStatus}
            />
          </section>
          <section className={styles.submit}>
            <SubmitTestData
              totalContent={totalLevelTestData}
              currentContent={currentLevelTestData}
              currentAnswer={currentAnswer}
              currentChoice={currentChoice}
              totalPoint={totalPoint}
              userLevel={userLevel}
            />
          </section>
        </>
        
        }
        
      </div>
    )
  }
  }

export default LevelTest