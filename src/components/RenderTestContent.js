// CSS
import styles from "./RenderTestContent.module.css";

// hooks
import { useEffect } from "react";
import { useDispatch } from "react-redux";

// actions
import { levelTestActions } from "../store/leveltest-slice";

// Components
import TestChoices from "./ui/card/TestChoices";
import Loading from "./Loading";

// custom hooks
import underlineAnswer from "../api/underlineAnswer";

// async hooks
import { fetchLevelTestImageUrl } from "../store/leveltest-slice";

function RenderTestContent({currentLevelTestData, clickedChoiceIndex, currentImage, dataStatus, imageDataStatus}){

  const latestLevelTestData = currentLevelTestData[currentLevelTestData.length-1];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(levelTestActions.resetCurrentImage());
    dispatch(levelTestActions.changeCurrentAnswer(latestLevelTestData.answer));
    dispatch(levelTestActions.changeCurrentPoint(latestLevelTestData.point));
    if(latestLevelTestData.type === "guess"){
      dispatch(fetchLevelTestImageUrl(latestLevelTestData.img))
    }
  }, [latestLevelTestData])

  if(imageDataStatus === "loading"){
    return(
      <Loading
        text={"loading Image"}
        type={"relative"}
      />
    )
  }
   else {
    return(
    <div className={styles.content}>
      <div className={styles.type}>
        <h2>Q. <strong>Fill in</strong> the blank</h2>
      </div>
      <div className={styles.question}>
        {currentImage ? <img className={styles.img} src={currentImage} /> : null}
        <h2 dangerouslySetInnerHTML={{ __html: underlineAnswer(latestLevelTestData.question)}}></h2>
      </div>
      <div className={styles.choices}>
        <TestChoices
          choices={latestLevelTestData.choices}
          clickedChoiceIndex={clickedChoiceIndex}
        />
      </div>
    </div>
    )
  }
}

export default RenderTestContent;