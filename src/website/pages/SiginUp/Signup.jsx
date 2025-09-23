import PageMeta from "../../components/common/PageMeta";
import CommunityForm from "../../components/Community/CommunityForm";
import HeroSub from "../../components/HeroSub";

const Signup = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/siginup", text: "Sigin Up" },
  ];
  return (
    <>
      <PageMeta title="Sign up | Dhakshin Ekkam" />
      <HeroSub
        title="Sign up"
        description="Join the Dhakshin Ekkam community today! Connect with like-minded members, share experiences, and be part of a supportive, vibrant network where culture, friendship, and growth come together."
        breadcrumbLinks={breadcrumbLinks}
      />
      <CommunityForm />
    </>
  );
};

export default Signup;
