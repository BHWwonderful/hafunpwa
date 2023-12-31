// CSS
import styles from "./SubmitTestData.module.css";

// hooks
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

// actions
import { levelTestActions } from "../store/leveltest-slice";
import { topicActions } from "../store/topic-slice";

function SubmitTestData({totalContent, currentContent, currentAnswer, currentChoice, totalPoint, userLevel}){
  const dispatch = useDispatch();

  const currentPoint = useSelector((state) => state.levelTest.currentPoint);

  const [isCorrect, setIsCorrect] = useState(null);

  const handleIsCorrect = () => {
    if(currentChoice === ""){
      return null;
    }
    if(currentAnswer === currentChoice){
      setIsCorrect(true);
      dispatch(levelTestActions.addTotalPoint(currentPoint));
    } else{
      setIsCorrect(false);
    }
  }

  const handleGoToNextQuestion = () => {
    if(currentContent.length < totalContent.length){
      dispatch(levelTestActions.resetCurrentImage());
      dispatch(levelTestActions.resetClickedChoiceIndex());
      dispatch(levelTestActions.addQuestionIndex());
      dispatch(levelTestActions.resetCurrentChoice());
      setIsCorrect(null);
    }

    if(currentContent.length === totalContent.length){
      setIsCorrect(null);
      if(totalPoint < 6 && userLevel === "beginner" ){
        dispatch(topicActions.changeCurrentLevel("beginner"));
        dispatch(levelTestActions.changeIsResultShow());
      } else if(totalPoint >= 6 && userLevel === "beginner"){
        dispatch(levelTestActions.resetCurrentImage());
        dispatch(levelTestActions.resetClickedChoiceIndex());
        dispatch(levelTestActions.resetDataStatus());
        dispatch(levelTestActions.resetCurrentChoice());
        dispatch(levelTestActions.changeUserLevel("intermediate"));
        dispatch(topicActions.changeCurrentLevel("intermediate"));
        dispatch(levelTestActions.addQuestionIndex());
      } else if(totalPoint < 18 && userLevel === "intermediate"){
        dispatch(topicActions.changeCurrentLevel("intermediate"));
        dispatch(levelTestActions.changeIsResultShow());
      } else if(totalPoint >= 18 && userLevel === "intermediate"){
        dispatch(levelTestActions.resetCurrentImage());
        dispatch(levelTestActions.resetClickedChoiceIndex());
        dispatch(levelTestActions.resetDataStatus());
        dispatch(levelTestActions.resetCurrentChoice());
        dispatch(levelTestActions.changeUserLevel("fluent"));
        dispatch(levelTestActions.addQuestionIndex());
      } else if(totalPoint < 33 && userLevel === "fluent"){
        dispatch(topicActions.changeCurrentLevel("fluent"));
        dispatch(levelTestActions.changeIsResultShow());
      } else if(totalPoint >= 33 && userLevel === "fluent"){
        dispatch(levelTestActions.resetCurrentImage());
        dispatch(levelTestActions.resetClickedChoiceIndex());
        dispatch(levelTestActions.resetDataStatus());
        dispatch(levelTestActions.resetCurrentChoice());
        dispatch(levelTestActions.changeUserLevel("advanced"));
        dispatch(levelTestActions.addQuestionIndex());
      } else if(totalPoint < 52 && userLevel === "advanced"){
        dispatch(topicActions.changeCurrentLevel("fluent"));
        dispatch(levelTestActions.changeIsResultShow());
      } else if(totalPoint >= 52 && userLevel === "advanced"){
        dispatch(topicActions.changeCurrentLevel("advanced"));
        dispatch(levelTestActions.changeIsResultShow());
      }
    }
  }

  return(
    <div className={styles.wrap}>
      {isCorrect !== null ? (
        isCorrect ? (
          <div className={styles.result}>
              <div className={styles.correct}>
              <span>Well done!</span>
              <button onClick={handleGoToNextQuestion}>Next</button>
            </div>
          </div>
          
        ) : (
          <div className={styles.result}>
            <div className={styles.incorrect}>
              <span>Sorry!</span>
              <button onClick={handleGoToNextQuestion}>Next</button>
            </div>
          </div>
        )
      ) : 
      <div className={styles.content}>
        <button onClick={handleIsCorrect} className={currentChoice == "" ? styles.button : `${styles.button} ${styles.submit}`}>submit</button>
      </div>
      }
    </div>
  )
}

export default SubmitTestData;