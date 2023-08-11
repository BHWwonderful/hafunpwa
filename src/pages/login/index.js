// CSS
import styles from "./LogInPage.module.css";

// Components
import LoginButton from "../../components/ui/buttons/LoginButton";
import Header from "../../components/semantics/Header";
import GoToHomeButton from "../../components/ui/buttons/GoToHomeButton";
import LogInHelpButton from "../../components/ui/buttons/LogInHelpButton";
import LogInWarningButton from "../../components/ui/buttons/LogInWarningButton";
import Loading from "../../components/Loading";

// custom hooks
import createUserByFirebase from "../../api/createUserByFirebase";
import signInWithEmailAndPasswordByFireBase from "../../api/signInWithEmailAndPasswordByFirebase";

// hooks
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAuth, signInWithRedirect, GoogleAuthProvider, getRedirectResult } from "firebase/auth";
import { addDoc, collection, query, getDocs, where } from "firebase/firestore/lite";
import db from "../../Firebase-config";

// assets
import visibilityImg from "../../assets/images/visibility.svg";
import visibilityOffImg from "../../assets/images/visibilityoff.svg";
import googleImg from "../../assets/images/google.svg";

// actions
import { topicActions } from "../../store/topic-slice";

function LogInPage(){
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPassWordError ] = useState(false);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const currentLevel = useSelector((state) => state.topic.currentLevel);

  const handleChangeLoading = () => {
    setLoading(true);
  }

  const namePattern = /^.{4,}$/;
    // at least 4 characters
    const emailPattern = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;

  const handleCreateAccount = async (event) => {
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
      handleChangeLoading();
      if(currentLevel === "all"){
        await createUserByFirebase(email, password, userName, "beginner");
      } else {
        await createUserByFirebase(email, password, userName, currentLevel);
      }
      setTimeout(() => {
        navigate('/profile');
      }, 2000)
    }
  }
  
  const handleLogIn = async (event) => {
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
      handleChangeLoading();
      await signInWithEmailAndPasswordByFireBase(email, password);
      setTimeout(() => {
        navigate('/profile');
      }, 2000)      
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
    setShowPassword(false);
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

  const handleLogInByGoogle = () => {
    sessionStorage.clear();
    signInWithRedirect(auth, provider);
  }

  const getUserDataFromGoogle = async () => {
    try{
      setLoading(true);
      const result = await getRedirectResult(auth);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      const user = result.user;
      const queryBeforeAddingDocument = query(collection(db, 'user'), where("email", "==", user.email));
      const querySnapshotBeforeAddingDocument = await getDocs(queryBeforeAddingDocument);

      if(querySnapshotBeforeAddingDocument.empty){
          const q = query(collection(db, 'user'));
        if(currentLevel === "all"){
          try{
            const querySnapshot = await addDoc(q, {
            name: user.displayName,
            uid: user.uid,
            email: user.email,
            photoURL: user.photoURL,
            userLevel: "beginner",
          })
          } catch(error){
            console.log(error);
          }
          
        } else {
          try{
            const querySnapshot = await addDoc(q, {
            name: user.displayName,
            uid: user.uid,
            email: user.email,
            photoURL: user.photoURL,
            userLevel: currentLevel,
          })
          } catch(error){
            console.log(error);
          }
        }
      } else{
        setLoading(false);
        navigate("/profile");
      }
      
      setLoading(false);
      navigate("/profile");

    } catch(error){
      setLoading(false);
      const errorCode = error.code;
      const errorMessage = error.message;

      const credential = GoogleAuthProvider.credentialFromError(error);
    }
  }

  useEffect(() => {
    getUserDataFromGoogle();

    return () => dispatch(topicActions.resetCurrentLevel());
  }, [])

  return(
    <div className={styles.content}>
      {loading ? <Loading text={"Log in..."} /> : null}
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
                  text={"Please enter a valid email address"}
                 />
                 :
                 <LogInHelpButton
                  text={"We need your email address to create your account. It will not be shared with anyone else"}
                 />
                 }
              </div>
              <div className={passwordError ? `${styles.formContentBox} ${styles.wrong}` : `${styles.formContentBox}`}>
                <label>Password</label>
                <input className={styles.formInput} onChange={(event) => handleChangePassword(event)} type={showPassword ? "text" : "password"} placeholder="Password" value={password}/>
                {passwordError ?
                  <LogInWarningButton
                    text={"Password must be between 8 and 25 characters, contain at least one English letter and one number"}
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
                  text={"User name must be minimum 4 characters"}
                 />
                :
                <LogInHelpButton
                  text={"User name is for your online profile"}
                />
                }
                
              </div>
              <div className={emailError ? `${styles.formContentBox} ${styles.wrong}` : `${styles.formContentBox}`}>
                <label>Email</label>
                <input className={styles.formInput} onChange={(event) => handleChangeEmail(event)} type="text" placeholder="Email" value={email} />
                {emailError ?
                  <LogInWarningButton
                    text={"Please enter a valid email address"}
                  />
                 :
                 <LogInHelpButton
                  text={"We need your email address to create your account. It will not be shared with anyone else"}
                />
                }
              </div>
              <div className={passwordError ? `${styles.formContentBox} ${styles.wrong}` : `${styles.formContentBox}`}>
                <label>Password</label>
                <input className={styles.formInput} onChange={(event) => handleChangePassword(event)} type={showPassword ? "text" : "password"} placeholder="Password" value={password}/>
                {passwordError ?
                  <LogInWarningButton
                    text={"Password must be between 8 and 25 characters, contain at least one English letter and one number"}
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
            <button onClick={handleLogInByGoogle} className={styles.google}>
              <img src={googleImg} alt="Sing in with Google" />
              <span>Google</span>
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}

export default LogInPage;