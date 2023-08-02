// CSS
import styles from "./LogInHelpButton.module.css";

// assets
import helpImg from "../../../assets/images/help.svg";
import chatBubbleImg from "../../../assets/images/chatbubble.svg";

// hooks
import { useState } from "react";

function LogInHelpButton({text}){

  const [showHelp, setShowHelp] = useState(false);

  let timerID;

  const handleShowHelp = (event) => {
    event.preventDefault();
    clearTimeout(timerID)
    setShowHelp(true);
    timerID = setTimeout(() => {
      setShowHelp(false)
    }, 2000)
  }

  return(
    <div>
      <button onClick={(event) => handleShowHelp(event)} className={styles.btn}>
        <img src={helpImg} alt="help" />  
      </button>
      {showHelp ?
        <div className={styles.chatBubble}>
          <img className={styles.arrow} src={chatBubbleImg} alt="chatbubble" />
          <span className={styles.bubble}>{text}</span>
        </div>
      : null}

    </div>
    
  )
}

export default LogInHelpButton;