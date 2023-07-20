// CSS
import styles from "./LessonCard.module.css"

function LessonCard({title, text, level}){

  let lessonCardClassName;

  switch (level){
    case "beginner":
      lessonCardClassName = `${styles.content} ${styles.beginner}`
      break;
    
    case "intermediate":
      lessonCardClassName = `${styles.content} ${styles.intermediate}`
      break;

    case "advanced":
      lessonCardClassName = `${styles.content} ${styles.advanced}`;
      break;

    case "proficient":
      lessonCardClassName = `${styles.content} ${styles.proficient}`;
      break;

    default:
      lessonCardClassName = `${styles.content}`;
  }

  return(
    <a className={lessonCardClassName}>
      <div className={styles.info}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.text}>{text}</p>
      </div>
      <div className={styles.img}>
        <img />
      </div>
    </a>
  )
}

export default LessonCard;