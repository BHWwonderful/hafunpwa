// CSS
import styles from "./GoToHomeButton.module.css"

// assets
import cancelImg from "../../../assets/images/cancel.svg";

// hooks
import { useNavigate } from "react-router-dom";

function GoToHomeButton(){

  const navigate = useNavigate();

  const handleGoBackToHomePage = () => {
    navigate("/");
  }

  return(
    <a onClick={handleGoBackToHomePage} className={styles.button}>
      <img src={cancelImg} />
    </a>
  )
}

export default GoToHomeButton;