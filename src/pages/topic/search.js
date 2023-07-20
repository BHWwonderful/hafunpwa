// Components
import GoBackButton from "../../components/ui/buttons/GoBackButton";
import Header from "../../components/semantics/Header"
import MobileWrapper from "../../components/layouts/MobileWrapper";
import SearchTopicContent from "../../components/SearchTopicContent";
import RenderTopicContent from "../../components/RenderTopicContent";


function TopicSearchPage(){
  return(
    <MobileWrapper>
      <Header
        leftChild={<GoBackButton />}
        centerChild={<h1>Search Topics</h1>}
      />
      <SearchTopicContent />
      <RenderTopicContent />
    </MobileWrapper>
  )
}

export default TopicSearchPage;