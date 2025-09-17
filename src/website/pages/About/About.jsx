import AboutSection from "../../About/AboutSection";
import HeroSub from "../../components/HeroSub";
import ChairPeronCarousel from "../../About/ChairPeronCarousel";
import TeamCarousel from "../../components/TeamCarousel";
import PageMeta from "../../components/common/PageMeta";
import AboutUsDetails from "../../About/AboutUsDetails";

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
      <AboutSection />
      <AboutUsDetails />
      <ChairPeronCarousel />
      <TeamCarousel />
    </>
  );
};

export default About;
