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

  const handleChangeUserEmail = (event) => {
    setUserEmail(event.target.value);
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

  const handleSubmitCredentialUserData = async (event) => {
    event.preventDefault();
    try{
      const user = auth.currentUser;

      const credential = await EmailAuthProvider.credential(credentialEmail, credentialPassword);
      
      await reauthenticateWithCredential(user, credential);

      const q = query(collection(db, "user"), where("uid", "==", userID));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const documentRef = doc(db, 'user', querySnapshot.docs[0].id);
        await deleteDoc(documentRef);
      }

      await deleteUser(user);

    } catch (error) {
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
              <input id="emailInput" onChange={(event) => handleChangeUserEmail(event)} type="text" value={userEmail} />
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
              <button className={styles.delete}>Yes I do want to delete my account</button>
              <button onClick={handleCloseCredentialModal} className={styles.goBack}>No</button>
            </div>
          </form>
        </div>
      :
        null
      }
      
    </div>
  )
}

export default ProfileSettingPage;