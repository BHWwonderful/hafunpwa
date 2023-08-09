// CSS
import styles from "./QnaEdit.module.css";

// Components
import Header from "../../../components/semantics/Header";
import GoBackButton from "../../../components/ui/buttons/GoBackButton";

// hooks
import { useParams } from "react-router-dom";

function QnaEditPage(){

  const params = useParams();
  console.log(params);

  return(
    <div>
      <Header
        leftChild={<GoBackButton />}
      />
      <div>질문을 편집하는 페이지</div>
    </div>
  )
}

export default QnaEditPage;