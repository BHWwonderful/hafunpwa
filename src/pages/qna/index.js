// Components
import HeaderContent from "../../components/semantics/HeaderContent";
import Gnb from "../../components/semantics/Gnb";
import MobileWrapper from "../../components/layouts/MobileWrapper";
import Loading from "../../components/Loading";
import QuestionCard from "../../components/ui/card/QuestionCard";

// hooks
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged} from "firebase/auth";
import { useInView } from "react-intersection-observer";
import db from "../../Firebase-config";
import { collection, orderBy, query, startAfter, limit, getDocs, where } from "firebase/firestore/lite";

// CSS
import styles from "./Qna.module.css";

function Qna(){

  const auth = getAuth();
  const navigate = useNavigate();

  const [ref, inView] = useInView();

  // 로딩 상태
  const [isLoading, setIsLoading] = useState(false);
  // 현재 페이지에 있는 질문 데아터
  const [questionData, setQuestionData] = useState([]);
  // 현재 페이지에 있는 유저 데이터
  const [userData, setUserData] = useState([]);
  // 다음 컨텐츠를 불러올 때 기준이 되는 마지막 데이터
  const [lastQuestionData, setLastQuestionData] = useState(null);
  // 다음 컨텐츠를 불러올 때 로딩 상태
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  // 추가로 요청할 데이터가 없을 때 상태
  const [noMore, setNoMore] = useState(false);
  // 필터링 조건값을 담는 상태
  const [filter, setFilter] = useState("all");

  const getInitialQuestionData = async () => {
    setNoMore(false);
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
      setUserData(userProfileDataFromFirebase);

      // 이후 추가로 데이터 요청을 할 때 기준 데이터가 될 데이터를 지정
      setLastQuestionData(querySnapshot.docs[querySnapshot.docs.length - 1])
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  const getInitialMyQuestionData = async () => {
    const q = query(collection(db, 'question'), where("userID", "==", auth.currentUser.uid), orderBy("date", 'desc'), limit(5));
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
      setUserData(userProfileDataFromFirebase);

      setLastQuestionData(querySnapshot.docs[querySnapshot.docs.length - 1])

      setIsLoading(false);
    } catch(error){
      console.log(error);
    }
  }

  const getInitialLikeQuestionData = async () => {
    const q = query(collection(db, 'like'), where("userID", "==", auth.currentUser.uid), orderBy("date", 'desc'), limit(5));
    try{
      setIsLoading(true);
      const querySnapshot = await getDocs(q);
      const dataFromFirebase = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      const userIDArray = dataFromFirebase.map((data) => {
        return (
          data.contentUserID
        )
      })
      const userProfileDataFromFirebase = await getUserData(userIDArray);
      
      setQuestionData(dataFromFirebase);
      setUserData(userProfileDataFromFirebase);

      setLastQuestionData(querySnapshot.docs[querySnapshot.docs.length - 1])

      setIsLoading(false);

    } catch(error){
      console.log(error);
    }
  }

  const loadMoreQuestionData = async () => {
    const moreQuery = query(collection(db, 'question'), orderBy('date', 'desc'), startAfter(lastQuestionData), limit(5))
    try{
      setIsLoadingMore(true)
      const moreQuerySnapshot = await getDocs(moreQuery);
      if(moreQuerySnapshot.empty === true){
        setIsLoadingMore(false);
        setNoMore(true);
        return ;
      } else {
        setLastQuestionData(moreQuerySnapshot.docs[moreQuerySnapshot.docs.length - 1]);

        const moreDataFromFirebase = moreQuerySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const moreUserIDArray = moreDataFromFirebase.map((data) => {
          return(
            data.userID
          )
        })
        const moreUserProfileDataFromFirebase = await getUserData(moreUserIDArray)
        setQuestionData((prevData) => [...prevData, ...moreDataFromFirebase]);
        setUserData((prevData) => [...prevData, ...moreUserProfileDataFromFirebase])
        setIsLoadingMore(false);
        return moreDataFromFirebase
      }
    } catch(error){
      console.log(error);
    }
  }

  const loadMoreMyQuestionData = async () => {
    if(!lastQuestionData){
      setNoMore(true);
      return ;
    }
    const moreQuery = query(collection(db, 'question'), where("userID", "==", auth.currentUser.uid), orderBy('date', 'desc'), startAfter(lastQuestionData), limit(5));
    try{
      setIsLoadingMore(true);
      const moreQuerySnapshot = await getDocs(moreQuery);
      if(moreQuerySnapshot.empty === true){
        setIsLoadingMore(false);
        setNoMore(true);
        return ;
      } else {
        setLastQuestionData(moreQuerySnapshot.docs[moreQuerySnapshot.docs.length - 1]);

        const moreDataFromFirebase = moreQuerySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const moreUserIDArray = moreDataFromFirebase.map((data) => {
          return(
            data.userID
          )
        })
        const moreUserProfileDataFromFirebase = await getUserData(moreUserIDArray)
        setQuestionData((prevData) => [...prevData, ...moreDataFromFirebase]);
        setUserData((prevData) => [...prevData, ...moreUserProfileDataFromFirebase])
        setIsLoadingMore(false);
        return moreDataFromFirebase
      }
    } catch(error){
      console.log(error);
    }
  }

  const loadMoreLikeQuestionData = async () => {
    if(!lastQuestionData){
      setNoMore(true);
      return ;
    }
    const moreQuery = query(collection(db, 'like'), where("userID", "==", auth.currentUser.uid), orderBy('date', 'desc'), startAfter(lastQuestionData), limit(5));
    try{
      setIsLoadingMore(true);
      const moreQuerySnapshot = await getDocs(moreQuery);
      if(moreQuerySnapshot.empty === true){
        setIsLoadingMore(false);
        setNoMore(true);
        return ;
      } else {
        setLastQuestionData(moreQuerySnapshot.docs[moreQuerySnapshot.docs.length - 1]);

        const moreDataFromFirebase = moreQuerySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const moreUserIDArray = moreDataFromFirebase.map((data) => {
          return(
            data.contentUserID
          )
        })
        const moreUserProfileDataFromFirebase = await getUserData(moreUserIDArray)
        setQuestionData((prevData) => [...prevData, ...moreDataFromFirebase]);
        setUserData((prevData) => [...prevData, ...moreUserProfileDataFromFirebase])
        setIsLoadingMore(false);
        return moreDataFromFirebase
      }

    } catch(error){
      console.log(error);
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

  const handleGoToQnaAskPage = () => {
    navigate("/qna/ask")
  }

  const handleGoToQnaDetailPage = (id, event) => {
    navigate(`/qna/detail/${id}`)
  }

  const handleGoToQnaEditPage = (id, event) => {
    navigate(`/qna/edit/${id}`)
  }

  const handleChangeFilter = (index) => {
    if(!auth?.currentUser){
      navigate("/login/")
    } else{
      setFilter(index);
    }
  }

  const handleResetFilter = () => {
    setFilter("all");
  }

  useEffect(() => {
    if (filter === "all" && inView && !isLoading) {
      loadMoreQuestionData();
    } else if(filter === "myQuestion" && inView && !isLoading){
      loadMoreMyQuestionData();
    } else if(filter === "like" && inView && !isLoading){
      loadMoreLikeQuestionData();
    }
  }, [inView, isLoading])

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user) {
        if(filter === "all"){
          getInitialQuestionData();
        } else if(filter === "myQuestion"){
          getInitialMyQuestionData();
        } else if(filter === "like"){
          getInitialLikeQuestionData();
        }
      } else {
        getInitialQuestionData();
      }
    })
  }, [filter])

  if(isLoading){
    return(
      <Loading />
    )
  } else{

    return(
      <MobileWrapper>
        <HeaderContent
          title={"Q&A"}
        />
        <main className={styles.main}>
          <section className={styles.filter}>
            <div className={styles.filterContainer}>
              <a className={filter === "all" ? styles.currentFilter : null} onClick={() => handleResetFilter()}>All</a>
              <a className={filter === "myQuestion" ? styles.currentFilter : null} onClick={() => handleChangeFilter("myQuestion")}>My question</a>
              <a className={filter === "like" ? styles.currentFilter : null} onClick={() => handleChangeFilter("like")}>Like</a>
            </div>
          </section>
          <section className={styles.postContainer}>
            {questionData.map((data, index) => {
              return(
                <div key={data.id} className={styles.questionCardWrap}>
                  <QuestionCard
                    userProfileImage={userData[index].photoURL}
                    userName={userData[index].name}
                    content={data.content}
                    date={data.date}
                    contentUserID={filter === "like" ? data.contentUserID : data.userID}
                    contentDate={data.date}
                    currentUserID={auth?.currentUser?.uid ? auth.currentUser.uid : "guest"}
                    questionID={filter === "like" ? data.questionID : data.id}
                    goToDetail={filter === "like" ? () => handleGoToQnaDetailPage(data.questionID) : () => handleGoToQnaDetailPage(data.id)}
                    goToEdit={filter === "like" ? () => handleGoToQnaEditPage(data.questionID) : () => handleGoToQnaEditPage(data.id)}
                    afterDelete={filter === "all" ? getInitialQuestionData : filter === "myQuestion" ? getInitialMyQuestionData : getInitialLikeQuestionData}
                  />
                </div>
              )
            })}
            {noMore ?
             <div className={styles.noMoreQuestion}>No more question!</div>
              :
             null}
             { isLoadingMore ? <div>로딩 중</div> : null}
          </section>
          <div ref={ref} className={styles.more}>
            
          </div>
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