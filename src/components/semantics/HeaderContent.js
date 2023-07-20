// CSS
import styles from "./HeaderContent.module.css"

// hooks
import { useLocation } from "react-router-dom";

// assets
import topicImg from "../../assets/images/topicBig.svg";
import lifestyleImg from "../../assets/images/lifestyleBig.svg";
import qnaImg from "../../assets/images/qnaBig.svg";
import profileImg from "../../assets/images/profileBig.svg";

const gnbCategories = [
  {
    id:"topic",
    img:topicImg,
    title:"Topic",
    path:"/topic",
  },
  {
    id:"lifestyle",
    img:lifestyleImg,
    title:"Lifestyle",
    path:"/lifestyle",
  },
  {
    id:"qna",
    img:qnaImg,
    title:"Q&A",
    path:"/qna",
  },
  {
    id:"profile",
    img:profileImg,
    title:"Profile",
    path:"/profile",
  },
]

function HeaderContent({rightChild}){

  const location = useLocation();
  
  const filteredCategory = gnbCategories.filter((category) => {
    return location.pathname.includes(category.id)
  })

  return(
    <header className={styles.header}>
      <div className={styles.info}>
        <img src={filteredCategory[0].img} />
        <h2 className={styles.title}>{filteredCategory[0].title}</h2>
      </div>
      <div>
        {rightChild}
      </div>
    </header>
  )
}

export default HeaderContent;