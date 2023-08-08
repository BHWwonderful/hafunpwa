// CSS
import styles from "./QuestionCard.module.css";

function QuestionCard({userProfileImage, userName, content, like, comment, navigation}){
  return(
    <div className={styles.post}>
      {navigation ?
        <a onClick={navigation} className={styles.contentLink}>
          <div className={styles.userInfo}>
            <img className={styles.userImg} src={userProfileImage} alt="User Profile Image" />
            <span className={styles.userName}>{userName}</span>
          </div>
          <div className={styles.question}>
            <p>{content}</p>
          </div>
        </a>
      :
        <>
          <div className={styles.userInfo}>
            <img className={styles.userImg} src={userProfileImage} alt="User Profile Image" />
            <span className={styles.userName}>{userName}</span>
          </div>
          <div className={styles.question}>
            <p>{content}</p>
          </div>
        </>
      }

      <div className={styles.subscribe}>
        <div className={styles.subscribeButton}>Like {like}</div>
        <div className={styles.subscribeButton}>Comment {comment}</div>
      </div>
    </div>
  )
}

export default QuestionCard;