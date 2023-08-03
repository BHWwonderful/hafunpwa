// hooks
import { useSelector } from "react-redux";

// CSS
import styles from "./RenderTopicContent.module.css";

// Components
import LessonCard from "./ui/card/LessonCard";
import NotFound from "./NotFound";

function RenderTopicContent(){

  const filteredData = useSelector((state) => state.topic.filteredData);

  if(filteredData.length === 0){
    return(
      <NotFound
        text={"No Results"}
      />
    )
  } else {
    return(
      <section className={styles.lessons}>
        {filteredData.map((data) => {
          return(
            <div key={data.id}>
              <LessonCard
                text={data.text}
                title={data.title}
                level={data.level}
                id={data.title.toLowerCase()}
              />
            </div>
          )
        })}
      </section>
    )
  }
  
}

export default RenderTopicContent;