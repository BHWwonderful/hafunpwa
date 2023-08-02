// assets
import warnImg from "../../../assets/images/warn.svg";

// hooks
import { useState } from "react";

// CSS
import styles from "./LogInWarningButton.module.css";
import chatBubbleImg from "../../../assets/images/chatbubble.svg"

function LogInWarningButton({ text }){

  const [showWarn, setShowWarn] = useState(false);

  let warnID;

  const handleShowWarn = (event) => {
    event.preventDefault();
    clearTimeout(warnID)
    setShowWarn(true);
    warnID = setTimeout(() => {
      setShowWarn(false)
    }, 2000)
  }

  return(
    <div>
      <button onClick={(event) => handleShowWarn(event)} className={styles.btn}>
        <img src={warnImg} />
      </button>
      {showWarn ?
        <div className={styles.chatBubble}>
         <img className={styles.arrow} src={chatBubbleImg} alt="chatbubble" />
         <span className={styles.bubble}>{text}</span>
        </div> 
        :
        null
      }
     </div>
    
  )
}

export default LogInWarningButton;