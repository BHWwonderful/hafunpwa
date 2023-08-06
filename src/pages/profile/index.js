// Components
import HeaderContent from "../../components/semantics/HeaderContent";
import Gnb from "../../components/semantics/Gnb";

// hooks
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged} from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// CSS
import styles from "./Profile.module.css";

// assets
import editImg from "../../assets/images/edit.svg";

function Profile(){

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const auth = getAuth();

  const [isLogIn, setIsLogIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  const logOut = () => {
    auth.signOut();
  }

  const handleGoToProfileSettingPage = () => {
    navigate("/profile/setting")
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if(user.photoURL !== null){
          setCurrentUser(user);
          setIsLogIn(true);
        }
      } else {
        setIsLogIn(false);
        navigate("/login")
      }
    })
  }, [])

  if(!isLogIn){
    return(
      <div>Log in Failed!</div>
    )
  } else if(isLogIn) {

    return(
      <div>
      <HeaderContent
        title={"Profile"}
        rightChild={<button onClick={logOut}>Log out</button>}
      />
      <main className={styles.main}>
        <section className={styles.userInfo}>
          <div className={styles.profile}>
            <a onClick={handleGoToProfileSettingPage} className={styles.profileLink}> 
              <img className={styles.profileImg} src={currentUser.photoURL} alt="Profile Image" />
              <img className={styles.edit} src={editImg} alt="Edit Profile" />
            </a>
            <h2 className={styles.userName}>{currentUser.displayName}</h2>
            <span className={styles.userLevel}>Beginner</span>
          </div>
        </section>
        <section className={styles.vocabulary}>
          <div className={styles.title}>
            <h2>Vocabulary</h2>
          </div>
          <div className={styles.vocabularyCard}>
            <ul>
              <li className={styles.vocabularyItem}>
                <span>elephant</span>
                <span>코끼리</span>
              </li>
              <li className={styles.vocabularyItem}>
                <span>ant</span>
                <span>개미</span>
              </li>
              <li className={styles.vocabularyItem}>
                <span>hog</span>
                <span>멧돼지</span>
              </li>
            </ul>
          </div>
        </section>
      </main>
      <Gnb />
    </div>
    )
  } else{
    return(
      <div></div>
    )
  }
}

export default Profile