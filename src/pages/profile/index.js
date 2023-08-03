// Components
import HeaderContent from "../../components/semantics/HeaderContent";
import Gnb from "../../components/semantics/Gnb";
import LogInModal from "../../components/LogInModal";

// hooks
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Profile(){

  const [isLogIn, setIsLogIn] = useState(false);

  const auth = getAuth();
  console.log(auth.currentUser);
  

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogIn(true);

      } else {
        setIsLogIn(false);
      }
    })
  })

  return(
    <div>
      <HeaderContent
        title={"Profile"}
      />
      {isLogIn ? null : <LogInModal />}
      <Gnb />
      
    </div>
  )
}

export default Profile