// CSS
import styles from "./LogInHelpButton.module.css";

// assets
import helpImg from "../../../assets/images/help.svg";

function LogInHelpButton({text}){
  return(
    <a className={styles.btn}>
      <img src={helpImg} alt="help" />
    </a>
  )
}

export default LogInHelpButton;