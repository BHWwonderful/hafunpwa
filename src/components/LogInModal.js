// CSS
import styles from "./LogInModal.module.css";

// Components
import LoginButton from "./ui/buttons/LoginButton";
import Header from "../components/semantics/Header";
import GoToHomeButton from "../components/ui/buttons/GoToHomeButton";
import LogInHelpButton from "./ui/buttons/LogInHelpButton";

// custom hooks
import createUserByFirebase from "../api/createUserByFirebase";

// hooks
import { useState } from "react";

function LogInModal(){

  const handleCreateAccount = (event) => {
    event.preventDefault()
  }
  
  const handleLogIn = (event) => {
    event.preventDefault();
  }

  const [isLogInClicked, setIsLogInClicked] = useState(false);

  const toggleIsLogInClicked = () => {
    setIsLogInClicked((prevState) => !prevState);
  }

  return(
    <div className={styles.content}>
      <Header
        leftChild={<GoToHomeButton />}
        rightChild={<LoginButton
            isLogInClicked={isLogInClicked}
            toggleIsLogInClicked={toggleIsLogInClicked}
          />}
      />
      <main className={styles.main}>
        <section>
          <div className={styles.title}>
            <h1>
              {isLogInClicked ? "Log In" : "Create Account"}  
            </h1>
          </div>
          {isLogInClicked ?
            <form onSubmit={handleLogIn} className={styles.form}>
            <div className={styles.formContent}>               
              <div className={styles.formContentBox}>
                <label>Email</label>
                <input type="email" placeholder="Email" />
                <LogInHelpButton />
              </div>
              <div className={styles.formContentBox}>
                <label>Password</label>
                <input type="password" placeholder="Password"/>
                <LogInHelpButton />
              </div>
            </div>
            <div className={styles.buttonContent}>
              <button>Log In</button>
            </div>
           </form>
           :
           <form onSubmit={handleCreateAccount} className={styles.form}>
            <div className={styles.formContent}>               
              <div className={styles.formContentBox}>
                <label>Name</label>
                <input type="text" placeholder="Name (Optional)" />
                <LogInHelpButton />
              </div>
              <div className={styles.formContentBox}>
                <label>Email</label>
                <input type="email" placeholder="Email" />
                <LogInHelpButton />
              </div>
              <div className={styles.formContentBox}>
                <label>Password</label>
                <input type="password" placeholder="Password"/>
                <LogInHelpButton />
              </div>
            </div>
            <div className={styles.buttonContent}>
              <button>Create Account</button>
            </div>
           </form>
            }
          
          <div className={styles.or}>
            <div></div>
            <span>Or</span>
            <div></div>
          </div>
          <div className={styles.externalLink}>
            <button className={styles.externalButton}>FaceBook</button>
            <button className={styles.externalButton}>Google</button>
          </div>
        </section>
      </main>
    </div>
  )
}

export default LogInModal;