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
  // 로그인 하지 않은 사용자도 페이지에 접속할 수 있도록 유저 아이디에 대한 기본값을 정해주는 상태
  const [currentUserID, setCurrentUserID] = useState("user");

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
      setUserData(userProfileDataFromFirebase);

      // 이후 추가로 데이터 요청을 할 때 기준 데이터가 될 데이터를 지정
      setLastQuestionData(querySnapshot.docs[querySnapshot.docs.length - 1])
      setIsLoading(false);
    } catch (err) {
      console.log(err);
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

  useEffect(() => {
    if (inView && !isLoading) {
      loadMoreQuestionData();
    }
  }, [inView, isLoading])

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user) {
        getInitialQuestionData();
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
        <HeaderContent
          title={"Q&A"}
        />
        <main className={styles.main}>
          <section className={styles.filter}>
            <div>All contents</div>
            <div>Questions that I like</div>
            <div>My content</div>
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
                  contentUserID={data.userID}
                  currentUserID={auth.currentUser.uid}
                  questionID={data.id}
                  goToDetail={() => handleGoToQnaDetailPage(data.id)}
                  goToEdit={() => handleGoToQnaEditPage(data.id)}
                  afterDelete={getInitialQuestionData}
                />
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