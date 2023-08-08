// Components
import HeaderContent from "../../components/semantics/HeaderContent";
import Gnb from "../../components/semantics/Gnb";
import MobileWrapper from "../../components/layouts/MobileWrapper";
import Loading from "../../components/Loading";
import QuestionCard from "../../components/ui/card/QuestionCard";

// hooks
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth} from "firebase/auth";
import db from "../../Firebase-config";
import { collection, orderBy, query, startAfter, limit, getDocs, where } from "firebase/firestore/lite";

// CSS
import styles from "./Qna.module.css";

function Qna(){

  const auth = getAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [questionData, setQuestionData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [lastQuestionData, setLastQuestionData] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [noMore, setNoMore] = useState(false);

  const getInitialQuestionData = async () => {
    const q = query(collection(db, 'question'), orderBy('date', 'desc'), limit(5));
    try{
      setIsLoading(true);
      const querySnapshot = await getDocs(q);
      const dataFromFirebase = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      const userIDArray = dataFromFirebase.map((data) => {
        return (
          data.userID
        )
      })
      const userProfileDataFromFirebase = await getUserData(userIDArray);

      setQuestionData(dataFromFirebase);
      setUserData(userProfileDataFromFirebase)
      setLastQuestionData(querySnapshot.docs[querySnapshot.docs.length - 1])
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  const getUserData = async (userIDArray) => {
    try {
      const promises = userIDArray.map(async (data) => {
        const userQuery = query(collection(db, 'user'), where("uid", "==", data));
        const userQuerySnapshot = await getDocs(userQuery);
        const userDataFromFirebase = userQuerySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        return userDataFromFirebase[0]
      })

      const userProfileData = await Promise.all(promises);
      return userProfileData;
    } catch(error) {
      console.log(error);
    }
  }

  // const getUserData = async (userIDArray) => {
  //   const userProfileData = [];
  //   try{
  //     userIDArray.forEach(async (data, index) => {
  //       const userQuery = query(collection(db, "user"), where("uid", "==", data));
  //       const userQuerySnapshot = await getDocs(userQuery);
  //       const userDataFromFirebase = userQuerySnapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }))
  //       const array = [...userProfileData, userDataFromFirebase]
  //     })
  //     console.log(userProfileData);
  //   } catch (error) {
  //     window.alert(error);
  //   }
  // } 

  // const getNextQuestionData = async () => {
  //   const q = query(collection(db, 'question'), orderBy('date', 'desc'), startAfter(lastQuestionData), limit(5));
  //   try{
  //     const querySnapshot = await getDocs(q);
  //     querySnapshot.empty === 0 ? setNoMore(true) : setLastQuestionData(querySnapshot.docs[querySnapshot.docs.length - 1]);
  //     const dataFromFirebase = querySnapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }))
  //     setQuestionData((prevData) => [...prevData, ...dataFromFirebase])
  //   } catch(error){
  //     console.log(error);
  //   }
  // }

  // const onIntersect = async ([entry], observer) => {
  //   if (entry.isIntersecting && !loadingMore) {
  //     observer.unobserve(entry.target);
  //     setLoadingMore(true);
  //   }
  // }

  const handleGoToQnaAskPage = () => {
    navigate("/qna/ask")
  }

  const handleGoToQnaEditPage = (id, event) => {
    navigate(`/qna/edit/${id}`)
  }

  useEffect(() => {
    getInitialQuestionData();
    
  }, [])

  if(isLoading){
    return(
      <Loading />
    )
  } else{
    console.log(questionData);
    return(
      <MobileWrapper>
        <HeaderContent
          title={"Q&A"}
        />
        <main className={styles.main}>
          <section className={styles.filter}>
            <div>Filter Content</div>
          </section>
          <section className={styles.postContainer}>
            {questionData.map((data, index) => {
              return(
                <QuestionCard
                  key={data.id}
                  userProfileImage={userData[index].photoURL}
                  userName={userData[index].name}
                  content={data.content}
                  like={data.like}
                  comment={data.comment}
                  navigation={() => handleGoToQnaEditPage(data.id)}
                />
              )
            })}
          </section>
        </main>
        <div className={styles.ask}>
          <a onClick={handleGoToQnaAskPage} className={styles.askQuestion}>Ask</a>
        </div>
        <Gnb />
      </MobileWrapper>
    )
  }

  }

export default Qna