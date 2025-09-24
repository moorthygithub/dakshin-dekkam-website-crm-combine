import AboutSection from "../About/AboutSection";
import OurObjectives from "../components/AllInOne";
import HeroMain from "../components/HeroMain";
import LatestNews from "../components/LatestNews";

function Home() {
  return (
    <div>
      <HeroMain />
      <AboutSection />
      <OurObjectives />
      <LatestNews />
    </div>
  );
}

export default Home;
