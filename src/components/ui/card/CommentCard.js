// CSS
import styles from "./CommentCard.module.css";

// assets
import moreImg from "../../../assets/images/more.svg";

// hooks
import { useState, useEffect } from "react";
import { deleteDoc, doc } from "firebase/firestore/lite";
import db from "../../../Firebase-config";

function CommentCard({userProfileImage, userName, content, commentID, currentUserID, contentUserID, afterDelete}){

  const [isCommentDropdownClicked, setIsCommentDropdownClicked] = useState(false);
  const [isSameUser, setIsSameUser] = useState(false);

  const handleChangeIsCommentDropdownClicked = () => {
    setIsCommentDropdownClicked(true);
  }

  const handleResetIsCommentDropdownClicked = () => {
    setTimeout(() => {
      setIsCommentDropdownClicked(false);
    }, 200)
  }

  const handleDeleteQuestion = async () => {
    try{
      const documentRef = doc(db, 'comment', commentID);
      await deleteDoc(documentRef);
      afterDelete();
    } catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
    if(currentUserID === contentUserID && currentUserID !== undefined && contentUserID !== undefined){
      setIsSameUser(true);
    }
  }, [])

  return(
    <div className={styles.commentContainer}>
      <div className={styles.commentUserInfo}>
        <div className={styles.commentProfile}>
          <img src={userProfileImage} alt="Profile Image" />
          <span>{userName}</span>
        </div>
        <div onBlur={handleResetIsCommentDropdownClicked} className={styles.commentFunctions}>
          <button onClick={handleChangeIsCommentDropdownClicked} className={styles.commentFunction}>
            <img src={moreImg} alt="comment delete" />
          </button>
          {isCommentDropdownClicked ?
            <div className={styles.commentDropdown}>
              {isSameUser ?
                <ul className={styles.commentDropdownList}>
                  <li onClick={handleDeleteQuestion}>
                    <button>Delete</button>
                  </li>
                </ul>
              :
                <ul className={styles.commentDropdownList}>
                  <li>
                    <button>Report</button>
                  </li>
                </ul>
              }
            </div>
          :
            null
          }
        </div>
      </div>
      <div className={styles.commentContent}>
        <p>{content}</p>
      </div>
    </div>
  )
}

export default CommentCard;