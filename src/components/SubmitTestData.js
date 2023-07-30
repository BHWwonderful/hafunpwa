// CSS
import styles from "./SubmitTestData.module.css";

// hooks
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// actions
import { levelTestActions } from "../store/leveltest-slice";

function SubmitTestData({totalContent, currentContent, currentAnswer, currentChoice, totalPoint, userLevel}){
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentPoint = useSelector((state) => state.levelTest.currentPoint);

  const [isCorrect, setIsCorrect] = useState(null);

  const handleIsCorrect = () => {
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
      setIsCorrect(null);
    }

    if(currentContent.length === totalContent.length){
      setIsCorrect(null);
      if(totalPoint < 6 && userLevel === "beginner" ){
        dispatch(levelTestActions.changeIsResultShow());
      } else if(totalPoint >= 6 && userLevel === "beginner"){
        dispatch(levelTestActions.resetCurrentImage());
        dispatch(levelTestActions.resetClickedChoiceIndex());
        dispatch(levelTestActions.resetDataStatus());
        dispatch(levelTestActions.changeUserLevel("intermediate"));
        dispatch(levelTestActions.addQuestionIndex());
      } else if(totalPoint < 18 && userLevel === "intermediate"){
        dispatch(levelTestActions.changeIsResultShow());
      } else if(totalPoint >= 18 && userLevel === "intermediate"){
        dispatch(levelTestActions.resetCurrentImage());
        dispatch(levelTestActions.resetClickedChoiceIndex());
        dispatch(levelTestActions.resetDataStatus());
        dispatch(levelTestActions.changeUserLevel("fluent"));
        dispatch(levelTestActions.addQuestionIndex());
      } else if(totalPoint < 33 && userLevel === "fluent"){
        dispatch(levelTestActions.changeIsResultShow());
      } else if(totalPoint >= 33 && userLevel === "fluent"){
        dispatch(levelTestActions.resetCurrentImage());
        dispatch(levelTestActions.resetClickedChoiceIndex());
        dispatch(levelTestActions.resetDataStatus());
        dispatch(levelTestActions.changeUserLevel("advanced"));
        dispatch(levelTestActions.addQuestionIndex());
      } else if(totalPoint < 52 && userLevel === "advanced"){
        dispatch(levelTestActions.changeUserLevel("fluent"));
        dispatch(levelTestActions.changeIsResultShow());
      } else if(totalPoint >= 52 && userLevel === "advanced"){
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
        <button onClick={handleIsCorrect} className={styles.button}>submit</button>
      </div>
      }
    </div>
  )
}

export default SubmitTestData;