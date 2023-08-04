// CSS
import styles from "./TextToSpeechButton.module.css";

// assets
import textToSpeechImg from "../../../assets/images/speak.svg";

// Components
import Speech from "react-text-to-speech";

function TextToSpeechButton({text}){
  return(
    <div className={styles.container} style={{backgroundImage : `url(${textToSpeechImg})`}}>
      <Speech  text={text} lang="en-GB" />
    </div>
  )
}

export default TextToSpeechButton;