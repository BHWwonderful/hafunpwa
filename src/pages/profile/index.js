// Components
import HeaderContent from "../../components/semantics/HeaderContent";
import Gnb from "../../components/semantics/Gnb";
import LogInModal from "../../components/LogInModal";

function Profile(){
  return(
    <div>
      <HeaderContent />
      <LogInModal />
      <Gnb />
    </div>
  )
}

export default Profile