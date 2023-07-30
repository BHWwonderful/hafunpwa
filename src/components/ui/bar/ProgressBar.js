// CSS
import styles from "./ProgressBar.module.css";

// hooks
import { useEffect, useState } from "react";

function Progressbar({totalContent, currentContent, userLevel}){

  const [barLength, setBarLength] = useState(0);

  let barClass;

  switch(userLevel) {
    case "beginner":
      barClass = `${styles.progress} ${styles.beginner}`;
      break;

    case "intermediate":
      barClass = `${styles.progress} ${styles.intermediate}`;
      break;

    case "fluent":
      barClass = `${styles.progress} ${styles.fluent}`;
      break;

    case "advanced":
      barClass = `${styles.progress} ${styles.advanced}`;
      break;

    default:
      barClass = `${styles.progress}`
  }

  useEffect(() => {
    const newBarLength = (currentContent.length / totalContent.length) * 100;
    setBarLength(newBarLength);
  }, [currentContent.length, totalContent.length])
  

  return(
    <div className={styles.bar}>
      <div style={{width: `${barLength}%`}} className={barClass}></div>
    </div>
  )
}

export default Progressbar;