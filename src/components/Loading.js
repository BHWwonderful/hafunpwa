// CSS
import styles from "./Loading.module.css"

function Loading({text = "Loading...", type}){

  let loadingClass;

  type === "relative" ? loadingClass = `${styles.loadingContent}` : loadingClass = `${styles.loading}`;

  return(
      <div className={loadingClass}>
        <svg width="180" height="87" viewBox="0 0 217 105" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path className={styles.path1} d="M11.8703 56.0873L11.9589 66.3894L25.2466 65.5832C25.2466 56.2664 25.3943 46.3824 25.6896 35.9309L37.3827 37.0059C36.8512 46.5018 36.5855 56.8039 36.5855 67.9123C36.5855 78.9609 36.9103 90.0693 37.5599 101.238L26.2211 100.252C25.6896 95.116 25.3647 86.8743 25.2466 75.527L12.2247 76.3332C12.4018 84.8139 12.6676 93.4437 13.0219 102.223L0.974431 101.148C0.324818 88.5464 0 76.9603 0 66.3894C0 55.8185 0.236233 46.681 0.708677 38.9768L12.4018 40.0518C12.0475 45.367 11.8703 50.7122 11.8703 56.0873ZM73.0878 100.073L71.0504 87.6208L57.8513 88.1583L54.4851 105L42.0832 103.925L57.9399 38.9768L74.328 40.4101L85.9326 101.148L73.0878 100.073ZM65.2924 50.7122L59.7116 78.5728L69.633 78.2145L65.2924 50.7122Z" fill="black"/>
          <path className={styles.path2} d="M124.788 39.335V50.3538C118.174 50.3538 111.973 50.5628 106.185 50.9809C106.067 52.7128 105.949 55.7887 105.831 60.2081C105.772 64.5679 105.713 67.2554 105.654 68.2706C112.268 67.3748 117.583 66.9268 121.599 66.9268L123.371 76.7811C116.756 76.9602 110.821 77.3784 105.565 78.0352C105.565 87.352 105.683 95.5639 105.92 102.671L93.9607 101.327C93.8426 91.652 93.7835 82.6638 93.7835 74.3623C93.7835 66.0608 94.2559 55.1616 95.2008 41.6642C105.299 40.1114 115.162 39.335 124.788 39.335ZM141.785 79.9165C141.785 83.0222 142.464 85.7992 143.823 88.2478C145.181 90.6963 146.775 91.9207 148.606 91.9207C150.496 91.9207 152.002 91.0847 153.124 89.4124C154.246 87.7401 155.043 85.5305 155.516 82.7832C156.343 77.9457 156.756 72.3617 156.756 66.031C156.756 59.6408 156.372 50.294 155.604 37.9913L167.652 39.2454C168.479 51.5482 168.892 59.9095 168.892 64.3289C168.892 68.7483 168.833 71.854 168.715 73.6456C168.597 75.3775 168.361 77.4082 168.006 79.7373C167.652 82.0665 167.18 84.2463 166.589 86.277C165.998 88.3076 165.201 90.338 164.197 92.3687C163.193 94.3993 162.012 96.1312 160.654 97.5645C157.642 100.849 153.538 102.492 148.341 102.492C143.203 102.492 138.803 100.162 135.141 95.5041C131.48 90.8457 129.649 85.6499 129.649 79.9165C129.649 67.315 130.328 53.8774 131.687 39.6038L143.734 40.7684C142.435 53.8476 141.785 66.8971 141.785 79.9165ZM216.911 37.9017L217 79.5582C217 86.4263 216.763 93.802 216.291 101.685L206.369 100.7C198.751 83.2013 192.52 70.0921 187.678 61.3726C187.737 70.2117 187.766 84.3061 187.766 103.656L177.402 102.492C177.225 98.7889 177.136 95.2055 177.136 91.7416C177.136 77.2888 177.933 60.447 179.528 41.2163L191.31 42.3809C197.156 58.6851 202.412 71.0775 207.078 79.5582C206.723 61.522 206.31 47.308 205.837 36.9163L216.911 37.9017Z" fill="#FF5C01"/>
          <path className={styles.path3} d="M137.331 12.3178C141.001 12.3178 143.975 9.56035 143.975 6.15889C143.975 2.75743 141.001 0 137.331 0C133.662 0 130.688 2.75743 130.688 6.15889C130.688 9.56035 133.662 12.3178 137.331 12.3178Z" fill="#9A0000"/>
          <path className={styles.path4} d="M161.692 12.3178C165.361 12.3178 168.336 9.56035 168.336 6.15889C168.336 2.75743 165.361 0 161.692 0C158.023 0 155.048 2.75743 155.048 6.15889C155.048 9.56035 158.023 12.3178 161.692 12.3178Z" fill="#9A0000"/>
        </svg>
        <span className={styles.text}>{text}</span>
      </div>
  )
}

export default Loading;