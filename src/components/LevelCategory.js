// CSS
import styles from "./LevelCategory.module.css";

// assets
import beginnerImg from "../assets/images/Level_category_beginner.png";
import intermediateImg from "../assets/images/Level_category_intermediate.png";
import advancedImg from "../assets/images/Level_category_advance.png";
import proficientImg from "../assets/images/Level_category_proficient.png";

const levelCategoryData = [
  {
    id: "beginner",
    title: "Beginner",
    text: "Learning basics",
    img: beginnerImg,
  },
  {
    id: "intermediate",
    title: "Intermediate",
    text: "Using English with confidence",
    img: intermediateImg,
  },
  {
    id: "fluent",
    title: "Fluent",
    text: "Becoming fluent",
    img: advancedImg,
  },
  {
    id: "advanced",
    title: "Advanced",
    text: "Speaking like a native",
    img: proficientImg,
  },
]

function LevelCategory(){
  return(
    <section className={styles.wrap}>
      <div className={styles.title}>
        <h2>Learn <strong>step by step</strong></h2>
      </div>
      <div className={styles.categories}>
        {
          levelCategoryData.map((category) => {
            return(
              <a className={styles.category} key={category.id}>
                <img src={category.img} />
                <div className={styles.info}>
                  <h3>{category.title}</h3>
                  <p className={styles.text}>{category.text}</p>
                </div>
              </a>
            )
          })
        }
      </div>
    </section>
  )
}

export default LevelCategory;