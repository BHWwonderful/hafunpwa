// CSS
import styles from "./ProgressBar.module.css";

// hooks
import { useEffect, useState } from "react";

function Progressbar({totalContent, currentContent}){

  const [barLength, setBarLength] = useState(0);

  useEffect(() => {
    const newBarLength = (currentContent.length / totalContent.length) * 100;
    setBarLength(newBarLength);
  }, [currentContent.length, totalContent.length])
  

  return(
    <div className={styles.bar}>
      <div style={{width: `${barLength}%`}} className={styles.progress}></div>
    </div>
  )
}

export default Progressbar;