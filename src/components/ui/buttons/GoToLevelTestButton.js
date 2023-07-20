// CSS
import styles from "./GoToLevelTestButton.module.css";

// hooks
import { useNavigate } from "react-router-dom";

function GoToLevelTestButton(){

  const navigate = useNavigate();

  const handleGoToLevelTest = () => {
    navigate("/leveltest");
  }

  return(
    <a onClick={handleGoToLevelTest} className={styles.button}>Level Test</a>
  )
}

export default GoToLevelTestButton;