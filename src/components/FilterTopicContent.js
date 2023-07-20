// CSS
import styles from "./FilterTopicContent.module.css"

// Components
import SelectLevelButton from "./ui/buttons/SelectLevelButton";

function FilterTopicContent(){
  return(
    <section className={styles.wrap}>
      <div>
        <SelectLevelButton />
      </div>
      <div>

      </div>
    </section>
  )
}

export default FilterTopicContent;