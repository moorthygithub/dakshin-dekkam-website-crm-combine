import PageMeta from "../../components/common/PageMeta";
import HeroSub from "../../components/HeroSub";
import MemberForm from "../../components/Member/MemberForm";

const Member = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/member", text: "Member" },
  ];
  return (
    <>
      <PageMeta title="Member | Dhakshin Ekkam" />
      <HeroSub
        title="Member"
        description="Meet the proud members of Dhakshin Ekkam, who form the heart of our community. Each member contributes their time, talent, and passion to build lasting connections and create meaningful impact together."
        breadcrumbLinks={breadcrumbLinks}
      />
      <MemberForm />
    </>
  );
};

export default Member;
