// CSS
import styles from "./GoBackButton.module.css"

// assets
import goBackImg from "../../../assets/images/back.svg"

// hooks
import { useNavigate } from "react-router-dom";

function GoBackButton({navigation}){

  const navigate = useNavigate();

  const handleGoBackPage = () => {
    navigate(-1);
  }

  return(
    <a onClick={navigation ? navigation : handleGoBackPage} className={styles.button}>
      <img src={goBackImg} />
    </a>
  )
}

export default GoBackButton;