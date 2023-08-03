// CSS
import styles from "./TopicLessonPage.module.css"

// hooks
import { useParams, useNavigate } from "react-router-dom";

// Components
import Gnb from "../../../../components/semantics/Gnb";
import Header from "../../../../components/semantics/Header";
import GoBackButton from "../../../../components/ui/buttons/GoBackButton";
import SearchButton from "../../../../components/ui/buttons/SearchButton";

// api hooks
import fetchTopicLessonDataFromFireStore from "../../../../api/fetchTopicLessonDataFromFireStore";
import { useEffect, useState } from "react";

function TopicLessonPage(){

  const params = useParams();
  const navigate = useNavigate();

  const [contentData, setContentData] = useState([]);
  
  useEffect(() => {
    const getTopicLessonData = async () => {
      const topicLessonArray = await fetchTopicLessonDataFromFireStore(params.id, params.lesson);
      setContentData(topicLessonArray);
    }
    getTopicLessonData();
  }, [])

  const handleGoBackToTopicDetailPage = () => {
    navigate(`/topic/detail/${params.id}`)
  }

  if(contentData.length !== 0){
    return(
      <div>
        <Header
          leftChild={<GoBackButton navigation={handleGoBackToTopicDetailPage} />}
          centerChild={<h1>{params.lesson}</h1>}
          rightChild={<SearchButton />}
        />
        <main className={styles.main}>
          <section className={styles.lesson}>
            <div>
              <h2 className={styles.title}>{contentData[0].lessons.lesson1.title}</h2>
            </div>
            <div>
              <span>hiya</span>
              <span>hiya</span>
              <span>hiya</span>
              <span>hiya</span>
              <span>hiya</span>
              <span>hiya</span>
              <span>hiya</span>
              <span>hiya</span>
            </div>
          </section>
          <section className={styles.lesson}>
            <div>
              <h2 className={styles.title}>{contentData[0].lessons.lesson2.title}</h2>
            </div>
            <div>
              <ul>
                <li>hiya</li>
                <li>hiya</li>
                <li>hiya</li>
                <li>hiya</li>
                <li>hiya</li>
                <li>hiya</li>
                <li>hiya</li>
              </ul>
            </div>
          </section>
          <section className={styles.lesson}>
            <div>
              <h2 className={styles.title}>{contentData[0].lessons.lesson3.title}</h2>
            </div>
            <div>
              <div>
                <img />
                <span></span>
              </div>
              <div>
                <span></span>
                <img />
              </div>
            </div>
          </section>
        </main>
        <Gnb />
      </div>
    )
  } else{
    return(
      <div></div>
    )
  }


}

export default TopicLessonPage;