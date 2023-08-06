// CSS
import styles from "./ProfileSettingPage.module.css";

// Components
import Gnb from "../../../components/semantics/Gnb";
import Header from "../../../components/semantics/Header";
import GoBackButton from "../../../components/ui/buttons/GoBackButton";

// hooks
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged} from "firebase/auth";

function ProfileSettingPage(){

  const navigate = useNavigate();
  const auth = getAuth();

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const GoBackToProfilePage = () => {
    navigate("/profile")
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if(user.photoURL !== null){
          setUserName(user.displayName);
          setUserEmail(user.email);
        }
      } else {
        navigate("/login")
      }
    })
  }, [])

  return(
    <div>
      <Header
        leftChild={<GoBackButton navigation={GoBackToProfilePage} />}
        centerChild={<h1>Edit Profile</h1>}
      />
      <main className={styles.main}>
        <form>
          <section className={styles.submitContainer}>
            <div className={styles.submit}>
              <h2 className={styles.title}>Account</h2>
              <button>Edit</button>
            </div>
          </section>
          <section>
            <div className={styles.input}>
              <label>Profile Image</label>
              <input type="file" />
            </div>
            <div className={styles.input}>
              <label>Name</label>
              <input type="text" placeholder="name" value={userName} />
            </div>
            <div className={styles.input}>
              <label>Email</label>
              <input type="text" value={userEmail} />
            </div>
          </section>
        </form>
      </main>
      <Gnb />
    </div>
  )
}

export default ProfileSettingPage;