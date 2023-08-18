// CSS
import styles from "./TopicLessonPage.module.css"

// hooks
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TextToSpeechButton from "../../../../components/ui/buttons/TextToSpeechButton";

// Components
import Gnb from "../../../../components/semantics/Gnb";
import Header from "../../../../components/semantics/Header";
import GoBackButton from "../../../../components/ui/buttons/GoBackButton";
import SearchButton from "../../../../components/ui/buttons/SearchButton";
import Loading from "../../../../components/Loading";

// api hooks
import fetchTopicLessonDataFromFireStore from "../../../../api/fetchTopicLessonDataFromFireStore";
import fetchTopicContentImagesFromFireStore from "../../../../api/fetchTopicContentImagesFromFireBase";


function TopicLessonPage(){

  const params = useParams();
  const navigate = useNavigate();

  const [contentData, setContentData] = useState([]);
  const [imageData, setImageData] = useState([]);
  
  useEffect(() => {
    const getTopicLessonData = async () => {
      const topicLessonArray = await fetchTopicLessonDataFromFireStore(params.id, params.lesson);
      setContentData(topicLessonArray);
    }
    getTopicLessonData();
  }, [])

  useEffect(() => {

    const getImageData = async (imageData) => {
      const imageUrlDataForLesson2 = await fetchTopicContentImagesFromFireStore(imageData);
      setImageData(imageUrlDataForLesson2);
    }

    if(contentData.length > 0){
      const imageDataForLesson2 = contentData[0].lessons.lesson2.words.map((data) => {
        return (
          data.img
        )
      })
      getImageData(imageDataForLesson2);
    }


  }, [contentData])

  const handleGoBackToTopicDetailPage = () => {
    navigate(`/topic/detail/${params.id}`)
  }

  if(contentData.length !== 0 && imageData.length !== 0){

    return(
        <div>
          <Header
            leftChild={<GoBackButton navigation={handleGoBackToTopicDetailPage} />}
            centerChild={<h1>{params.lesson}</h1>}
            rightChild={<SearchButton />}
          />
          <main className={styles.main}>
            <section className={styles.lesson}>
              <div className={styles.titleContainer}>
                <h2 className={styles.title}>{contentData[0].lessons.lesson1.title}</h2>
              </div>
              <div className={styles.vocabularyContainer}>
                {contentData[0].lessons.lesson1.words.map((data, index) => {
                  return (
                    <div key={index} className={styles.vocabulary}>
                      <div className={styles.vocabularyImg}>
                        {data.word.toUpperCase()}{data.word.toLowerCase()}
                      </div>
                      <div className={styles.speech}>
                        <TextToSpeechButton text={data.word} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
            <section className={styles.lesson}>
              <div className={styles.titleContainer}>
                <h2 className={styles.title}>{contentData[0].lessons.lesson2.title}</h2>
              </div>
              <div className={styles.wordsContainer}>
                {imageData.map((data, index) => {
                  return(
                    <div key={index} className={styles.word}>
                      <img src={data} />
                      <TextToSpeechButton text={contentData[0].lessons.lesson2.words[index].word} />
                    </div>  
                  )
                })}
              </div>
            </section>
          </main>
          <Gnb />
        </div>
    )
  } else{
    return(
      <Loading />
    )
  }


}

export default TopicLessonPage;