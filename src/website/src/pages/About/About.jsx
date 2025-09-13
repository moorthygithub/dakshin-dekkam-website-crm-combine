import AboutSection from "../../components/AboutSection";
import HeroSub from "../../components/HeroSub";
import ChairPeronCarousel from "../../components/ChairPeronCarousel";
import TeamCarousel from "../../components/TeamCarousel";
import PageMeta from "../../components/common/PageMeta";
import AboutUsDetails from "../../components/AboutUsDetails";

const About = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/about", text: "About" },
  ];
  return (
    <>
      <PageMeta title="About Us | Dhakshin Ekkam" />
      <HeroSub
        title="About Us"
        description="Discover who we are, what we do, and how we work together to create meaningful experiences."
        breadcrumbLinks={breadcrumbLinks}
      />
      <AboutUsDetails />
      <ChairPeronCarousel />
      <AboutSection />
      <TeamCarousel />
    </>
  );
};

export default About;
