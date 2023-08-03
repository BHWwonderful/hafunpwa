// CSS
import styles from "./LoginButton.module.css";

function LoginButton({toggleIsLogInClicked, isLogInClicked}){
  return(
    <button onClick={toggleIsLogInClicked} className={styles.button}>
      {isLogInClicked ? "Sign up" : "Log In"}
    </button>
  )
}

export default LoginButton;