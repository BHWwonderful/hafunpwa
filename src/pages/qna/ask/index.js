// CSS
import styles from "./QnaAsk.module.css";

// Components
import Header from "../../../components/semantics/Header";
import GoBackButton from "../../../components/ui/buttons/GoBackButton";
import Loading from "../../../components/Loading";

// hooks
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { query, collection, addDoc } from "firebase/firestore/lite";
import db from "../../../Firebase-config";

function QnaAskPage(){

  const navigate = useNavigate();
  const auth = getAuth();
  const [content, setContent] = useState("");
  const [userID, setUserID] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGoBackToQnaPage = () => {
    navigate("/qna")
  }

  const handleSubmitQuestion = async (event) => {
    event.preventDefault();
    try{
      setIsLoading(true);
      const q = query(collection(db, 'question'));
      const querySnapshot = await addDoc(q, {
        comment: 0,
        content: content,
        date: new Date(),
        like: 0,
        userID: userID,
      })
      setIsLoading(false);
    } catch(error){
      window.alert(error);
    }
  }

  const handleChangeContent = (event) => {
    setContent(event.target.value)
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserID(user.uid);
      } else {
        navigate("/login");
      }
    })
  }, [])

  // const q = query(collection(db, 'user'));
  // const querySnapshot = await addDoc(q, {
  //   name: name,
  //   uid: user.uid,
  //   email: email,
  //   photoURL: photoURL,
  // })

  return(
    <div className={styles.content}>
      {isLoading ? <Loading /> : null}
      <form onSubmit={(event) => handleSubmitQuestion(event)}>
        <Header
          leftChild={<GoBackButton navigation={handleGoBackToQnaPage} />}
          rightChild={<button disabled={content.trim() === ""} className={content.trim() === "" ? styles.disabled : styles.submit}> Submit</button>}
        />
        <main className={styles.main}>
          <div className={styles.titleContainer}>
            <h2 className={styles.title}>Ask question</h2>
          </div>
          <textarea onChange={(event) => handleChangeContent(event)} className={styles.textarea} />
        </main>
      </form>
    </div>
  )
}

export default QnaAskPage;