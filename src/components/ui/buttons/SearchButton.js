// CSS
import styles from "./SearchButton.module.css";

// hooks
import { useNavigate } from "react-router-dom";

// assets
import searchImg from "../../../assets/images/search.svg"

function SearchButton(){

  const navigate = useNavigate();

  const handleGoToSearchPage = () => {
    navigate('/topic/search');
  }

  return(
    <a onClick={handleGoToSearchPage} className={styles.btn}>
      <img src={searchImg} />
    </a>
  )
}

export default SearchButton;