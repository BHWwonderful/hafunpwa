// CSS
import styles from "./LessonCard.module.css";

// hooks
import { useNavigate } from "react-router-dom";

function LessonCard({title, text, level, id}){

  const navigate = useNavigate();

  const handleGoToTopicDetailPage = (id, event) => {
    navigate(`/topic/detail/${id}`);
  }

  let lessonCardClassName;

  switch (level){
    case "beginner":
      lessonCardClassName = `${styles.content} ${styles.beginner}`
      break;
    
    case "intermediate":
      lessonCardClassName = `${styles.content} ${styles.intermediate}`
      break;

    case "fluent":
      lessonCardClassName = `${styles.content} ${styles.fluent}`;
      break;

    case "advanced":
      lessonCardClassName = `${styles.content} ${styles.advanced}`;
      break;

    default:
      lessonCardClassName = `${styles.content}`;
  }

  return(
    <a onClick={(event) => handleGoToTopicDetailPage(id)} className={lessonCardClassName}>
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