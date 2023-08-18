// CSS
import styles from "./ProfileSettingPage.module.css";

// Components
import Gnb from "../../../components/semantics/Gnb";
import Header from "../../../components/semantics/Header";
import GoBackButton from "../../../components/ui/buttons/GoBackButton";
import Loading from "../../../components/Loading"

// hooks
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, updateProfile, deleteUser, reauthenticateWithCredential, EmailAuthProvider} from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateDoc, query, collection, where, getDocs, doc, deleteDoc } from "firebase/firestore/lite";
import db from "../../../Firebase-config";

function ProfileSettingPage(){

  const navigate = useNavigate();
  const auth = getAuth();
  const storage = getStorage();

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userProfileImg, setUserProfileImg] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  
  const [userID, setUserID] = useState("");

  const [isCredentialClicked, setIsCredentialClicked] = useState(false);
  const [credentialEmail, setCredentialEmail] = useState("");
  const [credentialPassword, setCredentialPassword] = useState("");

  const GoBackToProfilePage = () => {
    navigate("/profile")
  }

  const handleChangeUserName = (event) => {
    setUserName(event.target.value);
  }

  const handleChangeUserProfileImg = (event) => {
    setUserProfileImg(event.target.files[0]);
  }

  const handleUpdateProfile = async (event) => {
    event.preventDefault()
    try{
      setIsUpdate(true);
      const profileImgRef = ref(storage, `userImage/${userProfileImg.name}`);

      await uploadBytes(profileImgRef, userProfileImg);

      const downloadURL = await getDownloadURL(profileImgRef);
      
      await updateProfile(currentUser, { displayName: userName, photoURL: downloadURL});

      const q = query(collection(db, "user"), where('uid', "==", userID));
      
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const documentRef = doc(db, "user", querySnapshot.docs[0].id);

        await updateDoc(documentRef, {
          name: userName,
          photoURL: downloadURL,
        })
      }

      setIsUpdate(false);
      
    } catch(error){
      setIsUpdate(false);
      console.log(error);
    }
  }

  const handleShowCredentialModal = () => {
    setIsCredentialClicked(true);
  }

  const handleCloseCredentialModal = () => {
    setIsCredentialClicked(false);
  }

  const handleChangeCredentialEmail = (event) => {
    setCredentialEmail(event.target.value);
  }

  const handleChangeCredentialPassword = (event) => {
    setCredentialPassword(event.target.value);
  }

  const logOut = () => {
    auth.signOut();
  }

  const deleteQuestionAndLikeAndComment = async () => {
    try{
      // delete like content with current user ID
      const likeQuery = query(collection(db, 'like'), where('userID', '==', userID))
      const likeQuerySnapshot = await getDocs(likeQuery);
      const likeDataFromFirebase = likeQuerySnapshot.docs.map((doc) => ({
        id: doc.id,
      }))
      const likeIDArray = likeDataFromFirebase.map((data) => {
        return data.id
      })
      likeIDArray.forEach(async (id) => {
        const likeDoc = doc(db, "like", id);
        const deleteLike = await deleteDoc(likeDoc);
      })
      // delete comment content with current user ID
      const commentQuery = query(collection(db, "comment"), where("userID", "==", userID))
      const commentQuerySnapshot = await getDocs(commentQuery);
      const commentDataFromFirebase = commentQuerySnapshot.docs.map((doc) => ({
        id: doc.id,
      }))
      const commentIDArray = commentDataFromFirebase.map((data) => {
        return data.id
      })
      commentIDArray.forEach(async (id) => {
        const commentDoc = doc(db, "comment", id);
        const deleteComment = await deleteDoc(commentDoc);
      })
      // delete question content with current user ID
      const questionQuery = query(collection(db, 'question'), where("userID", "==", userID))
      const questionQuerySnapshot = await getDocs(questionQuery);
      const questionDataFromFirebase = questionQuerySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      const questionIDArray = questionDataFromFirebase.map((data) => {
        return data.id
      })
      // await deleting question data before it removes all comment and like data from the questions
      questionIDArray.forEach(async (id) => {
        // delete every like data from questions
        const questionLikeQuery = query(collection(db, "like"), where("questionID", "==", id))
        const questionLikeQuerySnapshot = await getDocs(questionLikeQuery);
        const questionLikeDataFromFirebase = questionLikeQuerySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        const questionLikeIDArray = questionLikeDataFromFirebase.map((data) => {
          return data.id;
        })
        questionLikeIDArray.forEach(async (id) => {
          const questionLikeDoc = doc(db, "like", id);
          const deleteQuestionLike = await deleteDoc(questionLikeDoc);
        })

        // delete every comment data from questions
        const questionCommentQuery = query(collection(db, "comment"), where("questionID", "==", id))
        const questionCommentQuerySnapshot = await getDocs(questionCommentQuery);
        const questionCommentDataFromFirebase = questionCommentQuerySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        const questionCommentIDArray = questionCommentDataFromFirebase.map((data) => {
          return data.id;
        })
        questionCommentIDArray.forEach(async (id) => {
          const questionCommentDoc = doc(db, "comment", id);
          const deleteQuestionComment = await deleteDoc(questionCommentDoc);
        })
      })

      questionIDArray.forEach(async (id) => {
        const questionDoc = doc(db, "question", id);
        const deleteQuestion = await deleteDoc(questionDoc);
      })

      return ;
    } catch(error){
      console.log(error);
    }
  }

  const handleSubmitCredentialUserData = async (event) => {
    event.preventDefault();
    try{
      setIsDelete(true);
      const user = auth.currentUser;

      const credential = await EmailAuthProvider.credential(credentialEmail, credentialPassword);
      
      await reauthenticateWithCredential(user, credential);

      await deleteQuestionAndLikeAndComment();

      const q = query(collection(db, "user"), where("uid", "==", userID));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const documentRef = doc(db, 'user', querySnapshot.docs[0].id);
        await deleteDoc(documentRef);
      }

      await deleteUser(user);
      setIsDelete(false);
    } catch (error) {
      setIsDelete(true);
      window.alert(error);
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if(user.photoURL !== null){
          setUserName(user.displayName);
          setUserEmail(user.email);
          setUserID(user.uid);
          setCurrentUser(user);
        }
      } else {
        navigate("/login");
      }
    })
  }, [])

  return(
    <div>
      {isUpdate ? <Loading text={"Updating Profile"} /> : null}
      {isDelete ? <Loading text={"Deleteing Account"} /> : null}
      <Header
        leftChild={<GoBackButton navigation={GoBackToProfilePage} />}
        centerChild={<h1>Edit Profile</h1>}
      />
      <main className={styles.main}>
        <form onSubmit={(event) => handleUpdateProfile(event)}>
          <section className={styles.submitContainer}>
            <div className={styles.submit}>
              <h2 className={styles.title}>Account</h2>
              <button className={styles.edit}>Edit</button>
            </div>
          </section>
          <section>
            <div className={styles.input}>
              <label>Profile Image</label>
              <input onChange={(event) => handleChangeUserProfileImg(event)} type="file" name="inputPhoto" />
            </div>
            <div className={styles.input}>
              <label>Name</label>
              <input id="nameInput" onChange={(event) => handleChangeUserName(event)} type="text" placeholder="name" value={userName} />
            </div>
            <div className={styles.input}>
              <label>Email</label>
              <input id="emailInput" type="text" value={userEmail} readOnly />
            </div>
          </section>
        </form>
        <section className={styles.functions}>
          <div className={styles.functionsTitle}>
            <h2>Options</h2>
          </div>
          <div>
            <button onClick={logOut} className={styles.logOut}>Log Out</button>
          </div>
          <div>
            <button onClick={handleShowCredentialModal} className={styles.delete}>Delete Account</button>
          </div>
        </section>
      </main>
      <Gnb />
      {isCredentialClicked
      ?
        <div className={styles.credentialWrap}>
          <div className={styles.credential}>
            <div className={styles.credentialTitleContainer}>
              <h2 className={styles.credentialTitle}><strong>Delete</strong> your account</h2>
            </div>
            <form onSubmit={(event) => handleSubmitCredentialUserData(event)} className={styles.credentialForm}>
              <div className={styles.credentialFormInput}>
                <label>Email</label>
                <input type="text" onChange={(event) => handleChangeCredentialEmail(event)} />
              </div>
              <div className={styles.credentialFormInput}>
                <label>Password</label>
                <input type="password" onChange={(event) => handleChangeCredentialPassword(event)} />
              </div>
              <div className={styles.credentialFormSubmit}>
                <span>Are you sure you really want to delete your account?</span>
                <button className={styles.delete}>Yes I want to delete my account</button>
                <button onClick={handleCloseCredentialModal} className={styles.goBack}>No</button>
              </div>
            </form>
          </div>
        </div>
      :
        null
      }
      
    </div>
  )
}

export default ProfileSettingPage;