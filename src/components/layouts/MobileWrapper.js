// CSS
import styles from "./MobileWrapper.module.css"

function MobileWrapper({children}){
  return(
    <div className={styles.wrap}>
      {children}
    </div>
  )
}

export default MobileWrapper;