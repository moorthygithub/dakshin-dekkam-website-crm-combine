import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const images = [
  "/img/testimonials.png",
  "/img/testimonials.png",
  "/img/testimonials.png",
];

const ImageSlider = () => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <Slider {...settings}>
        {images.map((src, idx) => (
          <div key={idx}>
            <img className=" mx-auto" src={src} alt={`slide-${idx}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
