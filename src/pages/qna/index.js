// Components
import HeaderContent from "../../components/semantics/HeaderContent";
import Gnb from "../../components/semantics/Gnb";
import MobileWrapper from "../../components/layouts/MobileWrapper";
import Loading from "../../components/Loading";

// hooks
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged} from "firebase/auth";

// RTK query hooks
import { useGetQuestionDataQuery } from "../../api/fireStoreApi";

// CSS
import styles from "./Qna.module.css";

function Qna(){

  const { data, error, isLoading } = useGetQuestionDataQuery();

  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user)

      } else {

      }
    })
  }, [])

  if(isLoading){
    return(
      <Loading />
    )
  } else{

    console.log(data.documents[0].fields.comment.arrayValue.values.length);

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
                <img src={data.documents[0].fields.userImage.stringValue} className={styles.userImg} alt="User Profile Image" />
                <span className={styles.userName}>{data.documents[0].fields.userName.stringValue}</span>
              </div>
              <div className={styles.question}>
                <p>{data.documents[0].fields.content.stringValue} </p>
              </div>
              <div className={styles.subscribe}>
                <div className={styles.subscribeButton}>Like {data.documents[0].fields.like.integerValue}</div>
                <div className={styles.subscribeButton}>Comment {data.documents[0].fields.comment.arrayValue.values.length}</div>
              </div>
            </div>
          </section>
        </main>
        <Gnb />
      </MobileWrapper>
    )
  }
  }

export default Qna