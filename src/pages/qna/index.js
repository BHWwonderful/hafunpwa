// Components
import HeaderContent from "../../components/semantics/HeaderContent";
import Gnb from "../../components/semantics/Gnb";
import MobileWrapper from "../../components/layouts/MobileWrapper";
import Loading from "../../components/Loading";

// hooks
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged} from "firebase/auth";
import db from "../../Firebase-config";
import { collection, orderBy, query, startAfter, limit, getDocs } from "firebase/firestore/lite";

// CSS
import styles from "./Qna.module.css";

function Qna(){

  const auth = getAuth();

  const [questionData, setQuestionData] = useState([]);

  const getInitialQuestionData = async () => {
    const q = query(collection(db, 'question'), orderBy('date', 'desc'), limit(5));
    const querySnapshot = await getDocs(q);
    const dataFromFirebase = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    setQuestionData(dataFromFirebase);
  }

  useEffect(() => {
    getInitialQuestionData()
  }, [])

    return(
      <MobileWrapper>
        <HeaderContent
          title={"Q&A"}
        />
        <main className={styles.main}>
          <section>
            <div>Filter Content</div>
          </section>
          <section className={styles.postContainer}>
            <div className={styles.post}>
              <div className={styles.userInfo}>
                <img className={styles.userImg} alt="User Profile Image" />
                <span className={styles.userName}></span>
              </div>
              <div className={styles.question}>
                <p> </p>
              </div>
              <div className={styles.subscribe}>
                <div className={styles.subscribeButton}>Like </div>
                <div className={styles.subscribeButton}>Comment </div>
              </div>
            </div>
          </section>
        </main>
        <div className={styles.ask}>
          <a className={styles.askQuestion}>Ask</a>
        </div>
        <Gnb />
      </MobileWrapper>
    )
  }

export default Qna