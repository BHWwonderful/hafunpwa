// CSS
import styles from "./LogInModal.module.css";

// Components
import LoginButton from "./ui/buttons/LoginButton";
import Header from "../components/semantics/Header";
import GoToHomeButton from "../components/ui/buttons/GoToHomeButton";
import LogInHelpButton from "./ui/buttons/LogInHelpButton";
import LogInWarningButton from "./ui/buttons/LogInWarningButton";

// custom hooks
import createUserByFirebase from "../api/createUserByFirebase";
import signInWithEmailAndPasswordByFireBase from "../api/signInWithEmailAndPasswordByFirebase";

// hooks
import { useState } from "react";

// assets
import visibilityImg from "../assets/images/visibility.svg";
import visibilityOffImg from "../assets/images/visibilityoff.svg";

function LogInModal(){

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPassWordError ] = useState(false);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const namePattern = /^.{4,}$/;
    // at least 4 characters
    const emailPattern = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;

  const handleCreateAccount = (event) => {
    event.preventDefault();
    setNameError(false);
    setPassWordError(false);
    setEmailError(false);

    if(!namePattern.test(userName)){
      setNameError(true);
    }

    if(!emailPattern.test(email)){
      setEmailError(true);
    }

    if(!passwordPattern.test(password)){
      setPassWordError(true);
    }
    
    if(namePattern.test(userName) && emailPattern.test(email) && passwordPattern.test(password)){
      createUserByFirebase(email, password, userName);
    }
  }
  
  const handleLogIn = (event) => {
    event.preventDefault();
    setNameError(false);
    setPassWordError(false);
    setEmailError(false);

    if(!emailPattern.test(email)){
      setEmailError(true);
    }

    if(!passwordPattern.test(password)){
      setPassWordError(true);
    }

    if(emailPattern.test(email) && passwordPattern.test(password)){
      signInWithEmailAndPasswordByFireBase(email, password);
    }
  }

  const [isLogInClicked, setIsLogInClicked] = useState(false);

  const toggleIsLogInClicked = () => {
    setUserName("");
    setPassword("");
    setEmail("");
    setNameError(false);
    setPassWordError(false);
    setEmailError(false);
    setIsLogInClicked((prevState) => !prevState);
  }

  const handleChangeUserName = (event) => {
    setUserName(event.target.value);
  }

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  }

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  }

  const handleToggleShowPassword = (event) => {
    event.preventDefault();
    setShowPassword((prevState) => !prevState)
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
              <div className={emailError ? `${styles.formContentBox} ${styles.wrong}` : `${styles.formContentBox}`}>
                <label>Email</label>
                <input className={styles.formInput} onChange={(event) => handleChangeEmail(event)} type="text" placeholder="Email" value={email} />
                {emailError ?
                 <LogInWarningButton
                  text={"Email warning"}
                 />
                 :
                 <LogInHelpButton />
                 }
                
              </div>
              <div className={passwordError ? `${styles.formContentBox} ${styles.wrong}` : `${styles.formContentBox}`}>
                <label>Password</label>
                <input className={styles.formInput} onChange={(event) => handleChangePassword(event)} type="password" placeholder="Password" value={password}/>
                {passwordError ?
                  <LogInWarningButton
                    text={"Password warning"}
                  />
                 :
                  <div className={styles.warn}></div>
                }
              </div>
            </div>
            <div className={styles.buttonContent}>
              <button>Log In</button>
            </div>
           </form>
           :
           <form onSubmit={handleCreateAccount} className={styles.form}>
            <div className={styles.formContent}>               
              <div className={nameError ? `${styles.formContentBox} ${styles.wrong}` : `${styles.formContentBox}`}>
                <label>Name</label>
                <input className={styles.formInput} onChange={(event) => handleChangeUserName(event)} type="text" placeholder="User Name" value={userName} />
                {nameError ? 
                 <LogInWarningButton
                  text={"Name warning"}
                 />
                :
                <LogInHelpButton
                  text={"For your online profile"}
                />
                }
                
              </div>
              <div className={emailError ? `${styles.formContentBox} ${styles.wrong}` : `${styles.formContentBox}`}>
                <label>Email</label>
                <input className={styles.formInput} onChange={(event) => handleChangeEmail(event)} type="text" placeholder="Email" value={email} />
                {emailError ?
                  <LogInWarningButton
                    text={"Email warning"}
                  />
                 :
                 <LogInHelpButton
                  text={"We need your email address to create your account. It will not be shared to anyone else"}
                />
                }
                
              </div>
              <div className={passwordError ? `${styles.formContentBox} ${styles.wrong}` : `${styles.formContentBox}`}>
                <label>Password</label>
                <input className={styles.formInput} onChange={(event) => handleChangePassword(event)} type={showPassword ? "text" : "password"} placeholder="Password" value={password}/>
                {passwordError ?
                  <LogInWarningButton
                    text={"Password warning"}
                  />
                 :
                  showPassword 
                  ? <button onClick={(event) => handleToggleShowPassword(event)} className={styles.show}>
                      <img src={visibilityImg} alt="see password" />
                    </button>
                  : <button onClick={(event) => handleToggleShowPassword(event)} className={styles.show}>
                      <img src={visibilityOffImg} />
                    </button>
                }
                
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