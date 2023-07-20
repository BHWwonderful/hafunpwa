// CSS
import styles from "./Gnb.module.css";

// hooks
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const gnbCategories = [
  {
    id: "home",
    title: "Home",
    path: "/",
  },
  {
    id: "topic",
    title: "Topic",
    path: "/topic",
  },
  {
    id: "lifestyle",
    title: "Lifestyle",
    path: "/lifestyle",
  },
  {
    id: "qna",
    title: "Q&A",
    path: "/qna",
  },
  {
    id: "profile",
    title: "Profile",
    path: "/profile",
  },
]

const buttonWidth = 100 / gnbCategories.length;

function Gnb(){

  const navigate = useNavigate();
  const location = useLocation();

  const handleChangeRoute = (event, path) => {
    navigate(`${path}`);
  }

  const getImgSrc = (path, id) => {
    if(location.pathname === "/" && id === "home"){
      return "images/homeActive.svg"
    } else if(location.pathname.includes(path) && id !== "home"){
      return `images/${id}Active.svg`;
    } else if(location.pathname.includes("leveltest") && id == "home"){
      return "images/homeActive.svg"
    } else{
      return `/images/${id}.svg`;
    }
  }

  const getTitleClassName = (path, id) => {
    if(location.pathname === "/" && id === "home"){
      return styles.titleActive;
    } else if(location.pathname.includes(path) && id !== "home"){
      return styles.titleActive;
    } else if(location.pathname.includes("leveltest") && id == "home"){
      return styles.titleActive;
    } else {
      return styles.title;
    }
  }

  return(
    <nav className={styles.nav}>
      {gnbCategories.map((category) => {
        return(
          <a key={category.id} className={styles.btn} onClick={(event) => {handleChangeRoute(event, category.path)}} style={{ width: `${buttonWidth}%`}}>
            <img src={getImgSrc(category.path, category.id)} />
            <h2 className={getTitleClassName(category.path, category.id)}>{category.title}</h2>
          </a>
        )
      })}
    </nav>
  )
}

export default Gnb;