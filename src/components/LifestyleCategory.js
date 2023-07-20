// CSS
import styles from "./LifestyleCategory.module.css"

// assets
import lifeCultureImg from "../assets/images/lifeandculture.png";
import phrasesImg from "../assets/images/phrases.jpg";
import accentsImg from "../assets/images/accents.jpg";
import whereToFindHelp from "../assets/images/wheretofindhelp.jpg";

const lifeStyleCategories = [
  {
    id: 1,
    title: "life & Culture",
    img: lifeCultureImg,
  },
  {
    id: 2,
    title: "Phrases",
    img: phrasesImg,
  },
  {
    id: 3,
    title: "Accents",
    img: accentsImg,
  },
  {
    id: 4,
    title: "Where to find help",
    img: whereToFindHelp,
  },
]

function LifestyleCategory(){
  return(
    <section className={styles.wrap}>
      <div className={styles.content}>
        <div className={styles.title}>
          <h2><strong>Life</strong> in Britain</h2>
        </div>
        <div className={styles.categories}>
          {lifeStyleCategories.map((category) => {
            return(
              <div key={category.id}>
                <div>
                  <img className={styles.img} src={category.img} />
                </div>
                <h2>{category.title}</h2>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default LifestyleCategory;