// CSS
import styles from "./leveltest.module.css"

// Components
import Header from "../../components/semantics/Header";
import GoToHomeButton from "../../components/ui/buttons/GoToHomeButton";
import Progressbar from "../../components/ui/bar/ProgressBar";
import RenderTestContent from "../../components/RenderTestContent";

// hooks
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import fetchLevelTestDataFromFireBase from "../../api/leveltestApi";

function LevelTest(){

  const dispatch = useDispatch();
  const userLevel = useSelector((state) => state.levelTest.userLevel);
  const [levelTestData, setLevelTestData] = useState([]);
  const [randomTest, setRandomTest] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchLevelTestDataFromFireBase(userLevel);
      setLevelTestData(data);
    };
    fetchData();
  }, [userLevel]);

  useEffect(() => {
    if (levelTestData.length > 0){
      const randomIndex = Math.floor(Math.random() * levelTestData.length);
      const randomItem = levelTestData[randomIndex];
      setRandomTest(randomItem);
    }
  }, [levelTestData])

  if(!levelTestData || !randomTest){
    return(
      <div>로딩 중 입니다.</div>
    )
  } else {

    return(
      <div className={styles.wrap}>
        <Header
          leftChild={<GoToHomeButton />}
          rightChild={<Progressbar />}
        />
        <RenderTestContent
          filteredData={randomTest}
        />
      </div>
    )
  }

  }

export default LevelTest