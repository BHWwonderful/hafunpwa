// CSS
import styles from "./Header.module.css"

function Header({leftChild, centerChild, rightChild}){
  return(
    <header className={styles.header}>
      <div>
        {leftChild}
      </div>
      <div className={styles.centerChild}>
        {centerChild}
      </div>
      <div>
        {rightChild}
      </div>
    </header>
  )
}

export default Header;