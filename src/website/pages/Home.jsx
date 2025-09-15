import AllInOne from "../components/AllInOne";
import Hero from "../components/Hero";
import Info from "../components/Info";
import LatestNews from "../components/LatestNews";

function Home() {
  return (
    <div>
      <Hero />
      <AllInOne />
      <LatestNews />
      <Info />
    </div>
  );
}

export default Home;
