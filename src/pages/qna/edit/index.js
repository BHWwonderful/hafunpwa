// CSS
import styles from "./QnaEdit.module.css";

// Components
import Header from "../../../components/semantics/Header";
import MobileWrapper from "../../../components/layouts/MobileWrapper";
import GoBackButton from "../../../components/ui/buttons/GoBackButton";
import QuestionCard from "../../../components/ui/card/QuestionCard";
import Loading from "../../../components/Loading";

// hooks
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDoc, getDocs, doc, query, where, collection } from "firebase/firestore/lite";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import db from "../../../Firebase-config";

function QnaDetailPage(){

  const auth = getAuth();
  const params = useParams();
  const navigate = useNavigate();
  const [questionData, setQuestionData] = useState(null);
  const [userData, setUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(true);

  const getQuestionDetailData = async (id) => {
    try{
      setIsLoading(true)
      const docRef = doc(db, "question", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()){
        setQuestionData(docSnap.data());
        console.log(docSnap.data().userID)
        const newUserData = await getUserDetailData(docSnap.data().userID);
        setUserData(newUserData);
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
  
  const handleGoBackToQnaPage = () => {
    navigate("/qna")
  }

  const handleSubmitComment = (event) => {
    event.preventDefault();
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getQuestionDetailData(params.id);
      } else {
        navigate("/login");
      }
    })
  }, [])

  if(isLoading){
    return(
      <Loading />
    )
  } else{

    return(
      <MobileWrapper>
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
          />
          <section>
            <div className={styles.commentContainer}>
              <div className={styles.commentUserInfo}>
                <img />
                <span>User name</span>
              </div>
              <div className={styles.commentContent}>
                <p>Content</p>
              </div>
            </div>
          </section>
          <div className={styles.submitComment}>
            <form className={styles.form}>
              <input type="text" />
              <button onClick={(event) => handleSubmitComment(event)}>Submit</button>
            </form>
          </div>
        </main>
      </MobileWrapper>
    )
  }

  
}

export default QnaDetailPage;