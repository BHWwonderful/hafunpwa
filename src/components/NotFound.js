// assets
import notFoundImg from "../../src/assets/images/notfound.svg";

// CSS
import styles from "./NotFound.module.css"

function NotFound({text = "Sorry!"}){
  return(
    <div className={styles.notFoundContent}>
      <img src={notFoundImg} alt="not found" />
      <span>{text}</span>
    </div>
  )
}

export default NotFound;