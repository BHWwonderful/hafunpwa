// Components
import HeaderContent from "../../components/semantics/HeaderContent";
import Gnb from "../../components/semantics/Gnb";
import LogInModal from "../../components/LogInModal";

// hooks
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

function Qna(){

  const [isLogIn, setIsLogIn] = useState(false);
  const [username, setUserName] = useState("");
  const [userProfilePhoto, setUserProfilePhoto] = useState("");

  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogIn(true);
        setUserName(user.displayName);
        setUserProfilePhoto(user.photoURL);
      } else {
        setIsLogIn(false);
      }
    })
  })

  const handleLogOut = () => {
    auth.signOut();
  }

    return(
      <div>
        <HeaderContent
          title={"Q&A"}
        />
        {isLogIn ? null : <LogInModal />}
        <Gnb />
        <button onClick={handleLogOut}>Log out</button>
      </div>
    )
  }

export default Qna