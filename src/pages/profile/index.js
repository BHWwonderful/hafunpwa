// Components
import HeaderContent from "../../components/semantics/HeaderContent";
import Gnb from "../../components/semantics/Gnb";
import LogInModal from "../../components/LogInModal";

// hooks
import createUserByFirebase from "../../api/createUserByFirebase";

function Profile(){

  const user = createUserByFirebase("admin123@naver.com", "admin123");

  return(
    <div>
      <HeaderContent />
      <LogInModal />
      <Gnb />
    </div>
  )
}

export default Profile