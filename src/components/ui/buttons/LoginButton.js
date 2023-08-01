// CSS
import styles from "./LoginButton.module.css";

function LoginButton({toggleIsLogInClicked, isLogInClicked}){
  return(
    <button onClick={toggleIsLogInClicked} className={styles.button}>
      {isLogInClicked ? "Log Out" : "Log In"}
    </button>
  )
}

export default LoginButton;