// CSS
import styles from "./SearchTopicContent.module.css"

// Components
import searchDisabledImg from "../assets/images/searchDisabled.svg";

// hooks
import { useEffect } from "react";
import { useDispatch } from "react-redux";

// actions
import { fetchTopicDataByKeyword } from "../store/topic-slice";

function SearchTopicContent(){

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTopicDataByKeyword(""));
  }, [])

  let timerId;
  // TimerId 변수가 handle~ 함수의 지역 변수로 선언하면
  // 함수가 호출될 때마다 timerId가 새로 생성되고
  // 초기화되기 때문에, 이전에 예약된 타이머가 취소되지 않는다.

  const handleRenderTopicByKeyword = (event) => {

    if (timerId){
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      dispatch(fetchTopicDataByKeyword(event.target.value))
    }, 1000)
  }

  return(
    <section className={styles.container}>
      <div className={styles.content}>
        <div className={styles.img}>
          <img src={searchDisabledImg} />
        </div>
        <div>
          <input onChange={handleRenderTopicByKeyword} className={styles.search} type="search" size="20" placeholder="ex) Alphabet"></input>
        </div>
      </div>
    </section>
  )
}

export default SearchTopicContent;