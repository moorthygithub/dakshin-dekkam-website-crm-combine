import PageMeta from "../../components/common/PageMeta";
import GalleryCard from "../../components/GalleryCard";
import HeroSub from "../../components/HeroSub";

const Gallery = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/gallery", text: "Gallery" },
  ];
  return (
    <>
      <PageMeta title="Gallery | Dhakshin Ekkam" />
      <HeroSub
        title="Gallery"
        description="Explore moments captured from our events, celebrations, and community gatherings. Our gallery showcases the spirit, culture Dhakshin Ekkam."
        breadcrumbLinks={breadcrumbLinks}
      />
      <GalleryCard
        bigImage="img/laptop-news.png"
        smallImages={[
          "img/children-laptop.png",
          "img/girl-laptop.png",
          "img/cat-laptop.png",
          "img/children-laptop.png",
        ]}
      />
      <GalleryCard
        bigImage="img/cat-laptop.png"
        smallImages={[
          "img/girl-laptop.png",
          "img/children-laptop.png",
          "img/laptop-news.png",
          "img/cat-laptop.png",
        ]}
      />
    </>
  );
};

export default Gallery;
