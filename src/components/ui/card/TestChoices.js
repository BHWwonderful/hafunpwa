// hooks
import { useDispatch } from "react-redux";

// actions
import { levelTestActions } from "../../../store/leveltest-slice";

// CSS
import styles from "./TestChoices.module.css";

function TestChoices({choices, clickedChoiceIndex}){

  const dispatch = useDispatch();

  const handleButtonClick = (event, buttonId) => {
    dispatch(levelTestActions.changeClickedChoiceIndex(buttonId));
    dispatch(levelTestActions.changeCurrentChoice(event.target.textContent))
  }

  return(
    <>
      {choices.map((choice, index) => {
        return(
          <span
           onClick={(event) => handleButtonClick(event, index)}
           key={index}
           className={clickedChoiceIndex === index ? `${styles.choice} ${styles.clicked}` : `${styles.choice}`}>
            {choice}
          </span>
        )
      })}
    </>
  )
}

export default TestChoices;