// Components
import HeaderContent from "../../components/semantics/HeaderContent";
import Gnb from "../../components/semantics/Gnb";
import SearchButton from "../../components/ui/buttons/SearchButton";
import RenderTopicContent from "../../components/RenderTopicContent";
import MobileWrapper from "../../components/layouts/MobileWrapper";
import FilterTopicContent from "../../components/FilterTopicContent";

// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopicDataByLevel } from "../../store/topic-slice";

// actions
import { topicActions } from "../../store/topic-slice";

function Topic(){
  const dispatch = useDispatch();
  const { currentLevel, filteredData } = useSelector((state) => state.topic);

  useEffect(() => {
    dispatch(fetchTopicDataByLevel(currentLevel));
    return () => {
      dispatch(topicActions.resetCurrentLevel())
    }
  }, [dispatch])

  if(!filteredData){
    return(
      <div>로딩 중 입니다</div>
    )
  } else{
    return(
      <MobileWrapper>
        <HeaderContent
          rightChild={<SearchButton />}
        />
        <FilterTopicContent />
        <RenderTopicContent />
        <Gnb />
      </MobileWrapper>
    )
  }
}

export default Topic;