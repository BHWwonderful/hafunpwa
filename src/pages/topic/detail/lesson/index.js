// CSS
import styles from "./TopicLessonPage.module.css"

// hooks
import { useParams } from "react-router-dom";

// Components
import Gnb from "../../../../components/semantics/Gnb";
import Header from "../../../../components/semantics/Header";
import GoBackButton from "../../../../components/ui/buttons/GoBackButton";
import Loading from "../../../../components/Loading";

// api hooks
import fetchTopicLessonDataFromFireStore from "../../../../api/fetchTopicLessonDataFromFireStore";
import { useEffect, useState } from "react";

function TopicLessonPage(){

  const params = useParams();

  const [contentData, setContentData] = useState([]);
  
  useEffect(() => {
    const getTopicLessonData = async () => {
      const topicLessonArray = await fetchTopicLessonDataFromFireStore(params.id, params.lesson);
      setContentData(topicLessonArray);
    }
    getTopicLessonData();
  }, [])

  if(contentData.length !== 0){
    return(
      <div>
        <Header
          leftChild={<GoBackButton />}
          centerChild={<h1>{params.lesson}</h1>}
        />
        <main className={styles.main}>
          <section className={styles.lesson}>
            <h2 className={styles.title}>{contentData[0].lessons.lesson1.title}</h2>
          </section>
          <section className={styles.lesson}>
            <h2 className={styles.title}>{contentData[0].lessons.lesson2.title}</h2>
          </section>
          <section className={styles.lesson}>
            <h2 className={styles.title}>{contentData[0].lessons.lesson3.title}</h2>
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