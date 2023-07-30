// CSS
import styles from "./TestResult.module.css";

// hooks
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// actions
import { levelTestActions } from "../store/leveltest-slice";
import { topicActions } from "../store/topic-slice";

function TestResult(){

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLevel = useSelector((state) => state.levelTest.userLevel);
  const currentLevel = useSelector((state) => state.topic.currentLevel);

  useEffect(() => {
    dispatch(levelTestActions.resetTestData());
  }, [])

  const goToTopicPage = () => {
    navigate("/topic");
  }

  let userLevelClass;

  switch (currentLevel) {
    case "beginner":
      userLevelClass = styles.beginner;
      break;

    case "intermediate":
      userLevelClass = styles.intermediate;
      break;

    case "fluent":
      userLevelClass = styles.fluent;
      break;

    case "advanced":
      userLevelClass = styles.advanced;
      break;
    
    default:
      return "";
    
  }

  return(
    <main className={styles.main}>
      <div className={styles.titleContent}>
        <h2 className={styles.title}>Your <strong>current level</strong> is</h2>
      </div>
      <div className={`${styles.buttonContent} ${userLevelClass}`}>
        {currentLevel}
      </div>
      <div className={styles.links}>
        <a onClick={() => goToTopicPage(userLevel)} className={styles.link}>Go to Topic Page</a>
        <a className={styles.link}>Sign in / Sign up</a>
      </div>
  </main>
  )
}

export default TestResult;