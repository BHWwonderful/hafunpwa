// CSS
import styles from "./CommentCard.module.css";

// assets
import moreImg from "../../../assets/images/more.svg";

// hooks
import { useState, useEffect } from "react";
import { deleteDoc, doc } from "firebase/firestore/lite";
import db from "../../../Firebase-config";

function CommentCard({userProfileImage, userName, content, commentID, currentUserID, contentUserID, afterDelete, contentDate}){

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

  const getHowLongPassed = (date) => {
    const timestampToDate = date.toDate();
    const milliSeconds = new Date() - timestampToDate;
    const seconds = milliSeconds / 1000;
    if (seconds < 60){
      return 'just now'
    }
    const minutes = seconds/60;
    if (minutes < 2){
      return `${Math.floor(minutes)} min ago`
    } else if(minutes >= 2 && minutes < 60){
      return `${Math.floor(minutes)} mins ago`
    }
    const hours = minutes/60;
    if (hours < 2){
      return `${Math.floor(hours)} hour ago`
    } else if(hours >= 2 && hours < 24){
      return `${Math.floor(hours)} hours ago`
    }
    const days = hours/24;
    if (days < 2){
      return `${Math.floor(days)} day ago`
    } else if (days >= 2 && days < 7){
      return `${Math.floor(days)} days ago`
    }
    const weeks = days/7;
    if (weeks < 2){
      return `${Math.floor(weeks)} week ago`
    } else if(weeks >= 2 && weeks < 5){
      return `${Math.floor(weeks)} weeks ago`
    }
    const months = days / 30;
    if(months < 2){
      return `${Math.floor(months)} month ago`
    } else if(months >= 2 && months < 12){
      return `${Math.floor(months)} months ago`
    }
    const years = days/365;
    if(years < 2){
      return `${Math.floor(years)} year ago`
    } else if (years >= 2 && years){
      return `${Math.floor(years)} years ago`
    }
  }

  return(
    <div className={styles.commentContainer}>
      <div className={styles.commentUserInfo}>
        <div className={styles.commentProfile}>
          <img src={userProfileImage} alt="Profile Image" />
          <div className={styles.userInfoDetail}>
            <span className={styles.userName}>{userName}</span>
            <span className={styles.timeToNow}>{getHowLongPassed(contentDate)}</span>
          </div>
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