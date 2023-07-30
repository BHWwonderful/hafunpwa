// CSS
import styles from "./LogInModal.module.css"

// custom hooks
import createUserByFirebase from "../api/createUserByFirebase";

function LogInModal(){

  return(
    <div className={styles.content}>
      로그인 모달 창 입니다.
    </div>
  )
}

export default LogInModal;