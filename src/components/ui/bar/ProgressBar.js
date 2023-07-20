// CSS
import styles from "./ProgressBar.module.css"

function Progressbar(){
  return(
    <div className={styles.bar}>
      <div className={styles.progress}></div>
    </div>
  )
}

export default Progressbar;