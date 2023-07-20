// CSS
import styles from "./GoBackButton.module.css"

// assets
import goBackImg from "../../../assets/images/back.svg"

// hooks
import { useNavigate } from "react-router-dom";

function GoBackButton(){

  const navigate = useNavigate();

  const handleGoBackPage = () => {
    navigate(-1);
  }

  return(
    <a onClick={handleGoBackPage} className={styles.button}>
      <img src={goBackImg} />
    </a>
  )
}

export default GoBackButton;