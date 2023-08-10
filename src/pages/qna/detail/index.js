// CSS
import styles from "./QnaDetail.module.css"

// Components
import Header from "../../../components/semantics/Header";
import GoBackButton from "../../../components/ui/buttons/GoBackButton";
import QuestionCard from "../../../components/ui/card/QuestionCard";
import CommentCard from "../../../components/ui/card/CommentCard";
import Loading from "../../../components/Loading";

// hooks
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDoc, getDocs, doc, query, where, collection, addDoc, orderBy } from "firebase/firestore/lite";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import db from "../../../Firebase-config";

// assets
import submitArrowImg from "../../../assets/images/submitarrow.svg";

function QnaDetailPage(){

  const auth = getAuth();
  const params = useParams();
  const navigate = useNavigate();
  const [questionData, setQuestionData] = useState(null);
  const [userID, setUserID] = useState(null);
  const [comment, setComment] = useState("");
  const [commentData, setCommentData] = useState([]);
  const [commentUserData, setCommentUserData] = useState([]);
  const [userData, setUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(true);

  // 최하단 댓글 제출 요소의 모바일 최적화를 위한 상태
  const [isInputClicked, setIsInputClicked] = useState(false);
  const inputRef = useRef(null);

  const getQuestionDetailData = async (id) => {
    try{
      setIsLoading(true)
      const docRef = doc(db, "question", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()){
        setQuestionData(docSnap.data());
        const newUserData = await getUserDetailData(docSnap.data().userID);
        setUserData(newUserData);
        const newCommentData = await getCommentData();
        setCommentData(newCommentData);
        const newCommentUserData = newCommentData.map((data) => {
          return data.userID
        })
        const commentUserDataFromFirebase = await getCommentUserData(newCommentUserData);
        setCommentUserData(commentUserDataFromFirebase);
        setIsLoading(false);
      }
    } catch(error) {
      console.log(error);
    }
  }

  const getUserDetailData = async (uid) => {
    try{
      const q = query(collection(db, "user"), where("uid", "==", uid))
      const querySnapshot = await getDocs(q)
      const userDataFromFirebase = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      return userDataFromFirebase[0]
    } catch(error){
      console.log(error);
    }
  }

  const getCommentData = async () => {
    try{
      const q = query(collection(db, "comment"), where("questionID", "==", params.id), orderBy("date"));
      const querySnapshot = await getDocs(q);
      const commentDataFromFirebase = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      return commentDataFromFirebase
    } catch(error){
      console.log(error);
    }
  }

  const getCommentUserData = async (commentUserIDArray) => {
    try{
      const commentUserPromises = commentUserIDArray.map(async (data) => {
        const commentUserQuery = query(collection(db, 'user'), where("uid", "==", data));
        const commentUserQuerySnapshot = await getDocs(commentUserQuery);
        const commentUserDataFromFirebase = commentUserQuerySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        return commentUserDataFromFirebase[0];
      })

      const commentUserProfileData = await Promise.all(commentUserPromises);
      return commentUserProfileData;
    } catch(error){
      console.log(error);
    }
  }
  
  const handleGoBackToQnaPage = () => {
    navigate("/qna")
  }

  const handleSubmitComment = async (event) => {
    event.preventDefault();
    try{
      setIsLoading(true);
      const q = query(collection(db, "comment"));
      const querySnapshot = await addDoc(q, {
        date: new Date(),
        questionID: params.id,
        userID: userID,
        content: comment,
      })
      setComment("")
      setIsLoading(false);

      await getQuestionDetailData(params.id);
    } catch(error){
      console.log(error);
    }
  }

  const handleChangeComment = (event) => {
    setComment(event.target.value);
  }

  const handleChangeIsInputClicked = () => {
    setTimeout(() => {
      console.log("Event!")
      setIsInputClicked(true);
    }, 1000)
  }

  const handleResetIsInputClicked = () => {
    setIsInputClicked(false);
  }

  const handleGoToQnaEditPage = (id, event) => {
    navigate(`/qna/edit/${id}`)
  }

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        await getQuestionDetailData(params.id);
        setUserID(user.uid);
      } else {
        navigate("/login");
      }
    })
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if(isInputClicked) {
        inputRef.current.blur();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [isInputClicked])



  if(isLoading){
    return(
      <Loading />
    )
  } else{

    console.log(commentData);
    console.log(commentUserData);

    return(
      <div className={styles.mobile}>
        <Header
          leftChild={<GoBackButton navigation={handleGoBackToQnaPage} />}
          centerChild={<h1>Detail Question</h1>}
        />
        <main className={styles.main}>
          <QuestionCard
            userProfileImage={userData.photoURL}
            userName={userData.name}
            content={questionData.content}
            like={questionData.like}
            comment={questionData.comment}
            contentUserID={userData.uid}
            currentUserID={auth.currentUser.uid}
            questionID={params.id}
            goToEdit={() => handleGoToQnaEditPage(params.id)}
            afterDelete={handleGoBackToQnaPage}
          />
          {commentData.length === 0 ?
            <div className={styles.noComment}>No comment here!</div>
            :
            commentData.map((data, index) => {
              return(
                <CommentCard
                  key={index}
                  userProfileImage={commentUserData[index].photoURL}
                  userName={commentUserData[index].name}
                  content={data.content}
                  currentUserID={auth.currentUser.uid}
                  contentUserID={data.userID}
                  commentID={data.id}
                  afterDelete={() => getQuestionDetailData(params.id)}
                />
              )
            })
          }
          
        </main>
        <div className={styles.submitComment}>
            <form className={styles.form}>
              <input
                onChange={(event) => handleChangeComment(event)}
                type="text"
                value={comment}
                ref={inputRef}
                onFocus={handleChangeIsInputClicked}
                onBlur={handleResetIsInputClicked}
             />
              <button onClick={(event) => handleSubmitComment(event)}>
                <img src={submitArrowImg} alt="submit" />
              </button>
            </form>
          </div>

      </div>
    )
  }

  
}

export default QnaDetailPage;