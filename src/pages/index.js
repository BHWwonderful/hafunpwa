// Components
import Header from "../components/semantics/Header";
import Gnb from "../components/semantics/Gnb";
import MobileWrapper from "../components/layouts/MobileWrapper";

// Custom Components
import LanguageSelectorButton from "../components/ui/buttons/LanguageSelectorButton";
import GoToLevelTest from "../components/GoToLevelTest";
import LevelCategory from "../components/LevelCategory";
import LifestyleCategory from "../components/LifestyleCategory";

// assets
import Logo from "../assets/images/Logo.svg"

function Home(){
  return(
    <MobileWrapper>
      <Header
        leftChild={<img src={Logo} />}
        rightChild={<LanguageSelectorButton />}
      />
      <GoToLevelTest />
      <LevelCategory />
      <LifestyleCategory />
      <Gnb />
    </MobileWrapper>
  )
}

export default Home;

