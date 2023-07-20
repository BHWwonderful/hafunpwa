// CSS
import styles from "./GoToLevelTest.module.css";

// Components
import GoToLevelTestButton from "./ui/buttons/GoToLevelTestButton";

// assets
import bgImg from "../assets/images/Home_levelTest.png"

function GoToLevelTest(){
  return(
    <section className={styles.wrap} style={{backgroundImage:`url(${bgImg})`}}>
      <div className={styles.title}>
        <h2>
          <strong>Have fun</strong> learning<br />
          Useful English for<br />
          everyday life
        </h2>
      </div>
      <div>
        <GoToLevelTestButton />
      </div>
    </section>
  )
}

export default GoToLevelTest