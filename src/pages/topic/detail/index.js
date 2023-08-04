// hooks
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// components
import Gnb from "../../../components/semantics/Gnb";
import MobileWrapper from "../../../components/layouts/MobileWrapper";
import Loading from "../../../components/Loading";
import Header from "../../../components/semantics/Header";
import GoBackButton from "../../../components/ui/buttons/GoBackButton";
import SearchButton from "../../../components/ui/buttons/SearchButton";

// api hooks
import fetchNestedTopicContent from "../../../api/fetchNestedTopicContent";
import fetchTopicContentImagesFromFireStore from "../../../api/fetchTopicContentImagesFromFireBase";

// CSS
import styles from "./TopicDetailPage.module.css"

function TopicDetailPage(){

  const navigate = useNavigate();
  const params = useParams();

  const [contentData, setContentData] = useState([]);
  const [contentImageArray, setContentImageArray] = useState([]);

  const GoToTopicLessonPage = (lesson) => {
    navigate(`/topic/detail/${params.id}/lesson/${lesson}`)
  }

  const GoBackTopicPage = () => {
    navigate(`/topic/`);
  }

  useEffect(() => {
    const getNestedTopicContentData = async () => {
      const dataFromFireBase = await fetchNestedTopicContent(params.id);
      const sortedDataFromFireBaseBySecond = dataFromFireBase.sort((a, b) => a.date.seconds - b.date.seconds);
      setContentData(sortedDataFromFireBaseBySecond);
    }
    getNestedTopicContentData();
  }, [])

  useEffect(() => {
    if(contentData !== 0){
      const imageArrayFromFireStore = contentData.map((data) => {
        return data.img
      })
      const fetchImageArrayFromFireCloud = async () => {
        const imageArrayFromFireCloud = await fetchTopicContentImagesFromFireStore(imageArrayFromFireStore);
        setContentImageArray(imageArrayFromFireCloud);
      }
      fetchImageArrayFromFireCloud();
    }
  }, [contentData])

  if(contentData.length !== 0 && contentImageArray.length !== 0){
    return(
      <MobileWrapper>
        <Header
          leftChild={<GoBackButton navigation={GoBackTopicPage} />}
          centerChild={<h1>{params.id}</h1>}
          rightChild={<SearchButton />}
        />
        <main className={styles.main}>
          <section>
            {contentData.map((data, index) => {
              return (
              <div className={styles.content} key={data.id}>
                <a className={styles.contentLink} onClick={() => GoToTopicLessonPage(data.title)}>
                  <img className={styles.contentImg} src={ contentImageArray[index] }/>
                </a>
                <h2 className={styles.contentTitle}>{data.title}</h2>
              </div>
              )
            })}
          </section>
        </main>
        <Gnb />
      </MobileWrapper>
    )
  } else{
    return(
      <Loading />
    )
  }
}

export default TopicDetailPage;