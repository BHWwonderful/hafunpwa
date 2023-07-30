// hooks
import { useParams } from "react-router-dom";

// components
import HeaderContent from "../../../components/semantics/HeaderContent";
import Gnb from "../../../components/semantics/Gnb";

function TopicDetailPage(){

  const params = useParams();
  console.log(params);

  return(
    <div>
      <HeaderContent />
      <Gnb />
    </div>
  )
}

export default TopicDetailPage;