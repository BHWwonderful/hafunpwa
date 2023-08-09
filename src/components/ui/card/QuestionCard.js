// CSS
import styles from "./QuestionCard.module.css";

// assets
import moreImg from "../../../assets/images/more.svg";

// components
import Loading from "../../Loading";

// hooks
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore/lite";
import db from "../../../Firebase-config";

function QuestionCard({userProfileImage, userName, content, like, comment, questionID, contentUserID, currentUserID, goToDetail, goToEdit, afterDelete }){

  const navigate = useNavigate();

  const [isDropdownClicked, setIsDropdownClicked] = useState(false);
  const [isSameUser, setIsSameUser] = useState(false);
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    if(contentUserID === currentUserID && contentUserID !== undefined && currentUserID !== undefined){
      setIsSameUser(true);
    }

    return () => {
      setIsSameUser(false);
    }
  }, [])

  const handleChangeIsDropdownClicked = () => {
    setIsDropdownClicked(true)
  }

  const handleResetIsDropdownClicked = () => {
    setTimeout(() => {
      setIsDropdownClicked(false);
    }, 200)
  }

  const handleChangeIsDeleteClicked = () => {
    setIsDeleteClicked(true);
  }

  const handleResetIsDeleteClickded = () => {
    setIsDeleteClicked(false);
  }

  const handleDeleteQuestion = async () => {
    try{
      setIsDelete(true);
      const documentRef = doc(db, 'question', questionID);
      await deleteDoc(documentRef);
      setIsDelete(false);
      afterDelete();
    } catch(error){
      console.log(error);
    }
  }

  return(
    <div className={styles.post}>
      {goToDetail ?
        <a onClick={goToDetail} className={styles.contentLink}>
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
      <div onBlur={handleResetIsDropdownClicked} className={styles.functions}>
        <button onMouseDown={handleChangeIsDropdownClicked}>
          <img src={moreImg} />
        </button>
        { isDropdownClicked ?
          <div className={styles.dropdown}>
          {isSameUser ?
            <ul className={styles.dropdownList}>
              <li onClick={goToEdit}>
                <a>Edit</a>
              </li>
              <li onClick={handleChangeIsDeleteClicked}>
                <a>Delete</a>
              </li>
            </ul>
          :
            <ul className={styles.dropdownList}>
              <li>
                <a>Report</a>
              </li>
            </ul>
          }
        </div>
          :
            null
        }
      </div>
      {
        isDeleteClicked ?
        <div className={styles.delete}>
          <div className={styles.deleteTitle}>
            <h2>Do you want to <strong>delete</strong> your post?</h2>
          </div>
          <div className={styles.deleteButtons}>
            <div className={styles.deleteButton}>
              <button onClick={() => handleDeleteQuestion()} className={styles.deleteContent}>Yes</button>
            </div>
            <div className={styles.deleteButton}> 
              <button className={styles.GoBackToContent} onClick={handleResetIsDeleteClickded}>No</button>
            </div>
          </div>
        </div>
        :
        null
      }
      {isDelete ? <Loading text={"deleting..."} type={"absolute"} /> : null}
    </div>
  )
}

export default QuestionCard;