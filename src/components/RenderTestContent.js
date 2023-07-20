// CSS
import styles from "./RenderTestContent.module.css"

function RenderTestContent({filteredData}){

  console.log(filteredData);
  
  return(
    <section className={styles.content}>
      <div>
        <h2>Q. <strong>Fill in</strong> the blank</h2>
      </div>
      <div>
        <h2>{filteredData.question}</h2>
      </div>
      <div className={styles.choices}>
        {filteredData.choices.map((choice, index) => {
          return(
            <span key={index}>{choice}</span>
          )
        })}
      </div>
    </section>
  )
}

export default RenderTestContent;