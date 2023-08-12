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

function QuestionCard({userProfileImage, userName, content, date, questionID, contentUserID, currentUserID, goToDetail, goToEdit, afterDelete }){

  const navigate = useNavigate();

  const [isDropdownClicked, setIsDropdownClicked] = useState(false);
  const [isSameUser, setIsSameUser] = useState(false);
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isUserLike, setIsUserLike] = useState(false);
  const [likeCount, setLikeCount] = useState(null);
  const [commentCount, setCommentCount] = useState(null);

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