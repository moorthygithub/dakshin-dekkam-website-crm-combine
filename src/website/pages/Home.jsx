import AboutSection from "../About/AboutSection";
import OurObjectives from "../components/AllInOne";
import AllInOne from "../components/AllInOne";
import HeroMain from "../components/HeroMain";
import Info from "../components/Info";
import LatestNews from "../components/LatestNews";

function Home() {
  return (
    <div>
      <HeroMain />
      <OurObjectives/>
      <AboutSection />

      <LatestNews />
      {/* <Info /> */}
    </div>
  );
}

export default Home;
