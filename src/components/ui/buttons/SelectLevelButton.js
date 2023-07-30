// hooks
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

// CSS
import styles from "./SelectLevelButton.module.css";

// assets
import dropdown from "../../../assets/images/dropdown.svg";

// actions
import { topicActions } from "../../../store/topic-slice";
import { fetchTopicDataByLevel } from "../../../store/topic-slice";

function SelectLevelButton(){

  const [isClicked, setIsClicked] = useState(false);
  const currentLevel = useSelector((state) => state.topic.currentLevel);
  const dispatch = useDispatch();

  const handleChangeIsClicked = () => {
    setTimeout(() => {
      setIsClicked(!isClicked)
    }, 200);
  }

  const handleCloseDropdown = async () => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    setIsClicked(false);
  }

  let currentTitle;

  switch (currentLevel){
    case "all":
      currentTitle = "All levels";
      break;

    case "beginner":
      currentTitle = "Beginner";
      break;

    case "intermediate":
      currentTitle = "Intermediate";
      break;

    case "fluent":
      currentTitle = "fluent";
      break;

    case "advanced":
      currentTitle = "Advanced";
      break;

    default:
      currentTitle = "All levels";
  }

  const handleLevelSelection = async (level) => {
    await handleCloseDropdown();
    dispatch(topicActions.changeCurrentLevel(level))
    dispatch(fetchTopicDataByLevel(level))
  }

  return(
    <ul onBlur={handleCloseDropdown} className={styles.wrap} tabIndex={0}>
      <li onMouseDown={handleChangeIsClicked} className={styles.btn}>
        <p className={styles.level}>{currentTitle}</p>
        <img className={styles.img} src={dropdown} />
      </li>
      {isClicked ?
        <div className={styles.dropdown}>
          <ul>
            <li className={styles.firstitem}>
              <button>Blank</button>
            </li>
            <li onMouseDown={() => handleLevelSelection("all")} className={styles.item}>
              <button>All Levels</button>
            </li>
            <li onMouseDown={() => handleLevelSelection("beginner")} className={styles.item}>
              <button>Beginner</button>
            </li>
            <li onMouseDown={() => handleLevelSelection("intermediate")} className={styles.item}>
              <button>Intermediate</button>
            </li>
            <li onMouseDown={() => handleLevelSelection("fluent")} className={styles.item}>
              <button>Fluent</button>
            </li>
            <li onMouseDown={() => handleLevelSelection("advanced")} className={styles.item}>
              <button>Advanced</button>
            </li>
          </ul>
        </div> : null
      }
      
    </ul>
  )
}

export default SelectLevelButton;