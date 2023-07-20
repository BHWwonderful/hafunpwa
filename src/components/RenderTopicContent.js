// hooks
import { useSelector } from "react-redux";

// CSS
import styles from "./RenderTopicContent.module.css";

// Components
import LessonCard from "./ui/card/LessonCard";

function RenderTopicContent(){

  const filteredData = useSelector((state) => state.topic.filteredData);

  return(
    <section className={styles.lessons}>
      {filteredData.map((data) => {
        return(
          <div key={data.id}>
            <LessonCard
              text={data.text}
              title={data.title}
              level={data.level}
            />
          </div>
        )
      })}
    </section>
  )
}

export default RenderTopicContent;