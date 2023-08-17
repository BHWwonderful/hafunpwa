// CSS
import styles from "./QuestionCard.module.css";

// assets
import moreImg from "../../../assets/images/more.svg";
import likeBeforeImg from "../../../assets/images/likeBefore.svg";
import likeAfterImg from "../../../assets/images/likeAfter.svg";
import commentImg from "../../../assets/images/comment.svg";

// components
import Loading from "../../Loading";

// hooks
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteDoc, doc, addDoc, collection, getDocs, query, where } from "firebase/firestore/lite";
import db from "../../../Firebase-config";

function QuestionCard({userProfileImage, userName, content, contentDate, date, questionID, contentUserID, currentUserID, goToDetail, goToEdit, afterDelete }){

  const navigate = useNavigate();

  const [isDropdownClicked, setIsDropdownClicked] = useState(false);
  const [isSameUser, setIsSameUser] = useState(false);
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isUserLike, setIsUserLike] = useState(false);
  const [likeCount, setLikeCount] = useState(null);
  const [commentCount, setCommentCount] = useState(null);

  // 디바운싱을 위한 타이머
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if(contentUserID === currentUserID && contentUserID !== undefined && currentUserID !== undefined){
      setIsSameUser(true);
    }

    return () => {
      setIsSameUser(false);
    }
  }, [])

  useEffect(() => {
    getLikeData();
    getCommentData();
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
      await deleteLikeAndComment();
      setIsDelete(false);
      afterDelete();
    } catch(error){
      console.log(error);
    }
  }

  const deleteLikeAndComment = async () => {
    try{
      const likeQuery = query(collection(db, "like"), where("questionID", "==", questionID));
      const likeQuerySnapshot = await getDocs(likeQuery);
      const likeDataFromFirebase = likeQuerySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      const likeIDArray = likeDataFromFirebase.map((data) => {
        return data.id
      })
      likeIDArray.forEach(async (id) => {
        const likeDoc = doc(db, "like", id);
        const deleteLike = await deleteDoc(likeDoc)
      })
      const commentQuery = query(collection(db, "comment"), where("questionID", "==", questionID));
      const commentQuerySnapshot = await getDocs(commentQuery);
      const commentDataFromFirebase = commentQuerySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      const commnetIDArray = commentDataFromFirebase.map((data) => {
        return data.id
      })
      commnetIDArray.forEach(async (id) => {
        const commentDoc = doc(db, "comment", id);
        const deleteComment = await deleteDoc(commentDoc);
      })
      return ;
    } catch(error){
      console.log(error);
    }
  }

  const getLikeData = async () => {
    try{
      const q = query(collection(db, 'like'), where("questionID", "==", questionID));
      const querySnapshot = await getDocs(q);
      if(querySnapshot.empty){
        setLikeCount(0)
        return ;
      } else{
        const likeQuery = query(collection(db, 'like'), where("userID", "==", currentUserID), where("questionID", "==", questionID));
        const likeQuerySnapshot = await getDocs(likeQuery);
        if(likeQuerySnapshot.empty){
          setLikeCount(querySnapshot.size);
          setIsUserLike(false);
          return ;
        } else{
          setLikeCount(querySnapshot.size);
          setIsUserLike(true);
          return ;
        }
      }
    } catch(error){
      console.log(error);
    }
  }

  const toggleIsUserLike = async () => {

    if(currentUserID === "guest"){
      navigate("/login/")
      return;
    }

    if(timer) {
      clearTimeout(timer);
    }

    const newTimer = setTimeout(async () => {
      try{
        const q = query(collection(db, 'like'), where("userID", "==", currentUserID), where("questionID", "==", questionID));
        const querySnapshot = await getDocs(q);
        if(querySnapshot.empty){
          const likeCollectionRef = collection(db, "like");
          const addLike = await addDoc(likeCollectionRef, {
            questionID: questionID,
            userID: currentUserID,
            contentUserID: contentUserID,
            content: content,
            date: date,
          })
          await getLikeData();
          setIsUserLike(true);
        } else{
          const currentLikeID = querySnapshot.docs[0].id
          const likeDoc = doc(db, "like", currentLikeID);
          const deleteLike = await deleteDoc(likeDoc);
          await getLikeData();
          setIsUserLike(false);
        }
      } catch(error){
        console.log(error);
      }   
    }, 800);
    setTimer(newTimer);   
  }

  const getCommentData = async () => {
    try{
      const q = query(collection(db, "comment"), where("questionID", "==", questionID));
      const querySnapshot = await getDocs(q);
      setCommentCount(querySnapshot.size);
      return ;
    } catch(error){
      console.log(error);
    }
  }

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
    <div className={styles.post}>
      {goToDetail ?
        <a onClick={goToDetail} className={styles.contentLink}>
          <div className={styles.userInfo}>
            <img className={styles.userImg} src={userProfileImage} alt="User Profile Image" />
            <div className={styles.userInfoDetail}>
              <span className={styles.userName}>{userName}</span>
              <span className={styles.timeToNow}>{getHowLongPassed(contentDate)}</span>
            </div>
          </div>
          <div className={styles.question}>
            <p>{content}</p>
          </div>
        </a>
      :
        <>
          <div className={styles.userInfo}>
            <img className={styles.userImg} src={userProfileImage} alt="User Profile Image" />
            <div className={styles.userInfoDetail}>
              <span className={styles.userName}>{userName}</span>
              <span className={styles.timeToNow}>{getHowLongPassed(contentDate)}</span>
            </div>
          </div>
          <div className={styles.question}>
            <p>{content}</p>
          </div>
        </>
      }

      <div className={styles.subscribe}>
        <button onClick={toggleIsUserLike} className={styles.subscribeButton}>
          {isUserLike ?
            <img src={likeAfterImg} alt="I like it" />
          :
            <img src={likeBeforeImg} alt="I don't like it yet" />
          }
          <span className={isUserLike ? styles.likeCountActive : styles.likeCount}>{likeCount === null ? null : likeCount}</span>
        </button>
        <div className={styles.subscribeButton}>
          {goToDetail ?
            <a className={styles.subscribeDetailLink} onClick={goToDetail}> 
              <img src={commentImg} alt="Comment" />
              <span className={styles.commentCount}>{commentCount === null ? null : commentCount}</span>
            </a>
           :
           <>
            <img src={commentImg} alt="Comment" />
            <span className={styles.commentCount}>{commentCount === null ? null : commentCount}</span>
           </>
           }
            
        </div>
      </div>
      <div onBlur={handleResetIsDropdownClicked} className={styles.functions}>
        <button onMouseDown={handleChangeIsDropdownClicked}>
          <img src={moreImg} />
        </button>
        { isDropdownClicked ?
          <div className={styles.dropdown}>
          {isSameUser ?
            <ul className={styles.dropdownList}>
              {/* <li onClick={goToEdit}>
                <a>Edit</a>
              </li> */}
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