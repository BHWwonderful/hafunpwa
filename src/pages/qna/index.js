// Components
import HeaderContent from "../../components/semantics/HeaderContent";
import Gnb from "../../components/semantics/Gnb";

// hooks
import { useState, useEffect } from "react";

function Qna(){

  const [isLogIn, setIsLogIn] = useState(false);
  const [username, setUserName] = useState("");
  const [userProfilePhoto, setUserProfilePhoto] = useState("");

    return(
      <div>
        <HeaderContent
          title={"Q&A"}
        />
        <Gnb />
      </div>
    )
  }

export default Qna