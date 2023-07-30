// Components
import HeaderContent from "../../components/semantics/HeaderContent";
import Gnb from "../../components/semantics/Gnb";
import Loading from "../../components/Loading";

function Qna(){

    return(
      <div>
        <HeaderContent />
        <section>
          <Loading />
        </section>
        <Gnb />
      </div>
    )
  }

export default Qna