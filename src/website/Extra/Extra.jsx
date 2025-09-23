import React from "react";
import Hero from "../components/Hero";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import DesktopNavbar from "../components/DesktopNavbar";
import Navbar from "../components/Navbar";
import Info from "../components/Info";
import ChairPersonCarousel from "../About/ChairPeronCarousel";
import CommunityForm from "../components/Community/CommunityForm";

const images = [
  {
    src: "https://demo.gloriathemes.com/eventchamp/demo/wp-content/uploads/2018/11/event-14-1920x1100.jpg",
    title: "Amazing Event 1",
    subtitle: "Join us for an unforgettable experience",
    buttonText: "Learn More",
  },
  {
    src: "https://demo.gloriathemes.com/eventchamp/demo/wp-content/uploads/2018/11/venue-3-1920x1100.jpg",
    title: "Beautiful Venue 2",
    subtitle: "Celebrate your special moments with us",
    buttonText: "Book Now",
  },
  {
    src: "https://demo.gloriathemes.com/eventchamp/demo/wp-content/uploads/2018/11/event-12-1920x1100.jpg",
    title: "Exciting Event 3",
    subtitle: "Experience the best events around",
    buttonText: "Discover",
  },
];

const NextArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 right-4 z-50 w-10 h-10 bg-white/70 rounded-full flex items-center justify-center cursor-pointer -translate-y-1/2 hover:bg-white"
    onClick={onClick}
  >
    <ChevronRight className="w-5 h-5 text-black" />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 left-4 z-50 w-10 h-10 bg-white/70 rounded-full flex items-center justify-center cursor-pointer -translate-y-1/2 hover:bg-white"
    onClick={onClick}
  >
    <ChevronLeft className="w-5 h-5 text-black" />
  </div>
);
const settings = {
  dots: true,
  arrows: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 8000,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  fade: true,
  pauseOnHover: false,
};

const Extra = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <div className="relative w-full h-screen">
        <Slider {...settings}>
          {images.map((item, idx) => (
            <div key={idx} className="relative w-full h-screen">
              {/* Background Image */}
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />

              {/* Animated Captions */}
              <div className="absolute inset-0 flex flex-col justify-center items-start px-8 md:px-20">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-4xl md:text-6xl font-bold text-white"
                >
                  {item.title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="text-lg md:text-2xl text-white mt-4"
                >
                  {item.subtitle}
                </motion.p>
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="mt-6 px-6 py-3 bg-orange-400 text-white rounded-full hover:bg-orange-500 transition"
                >
                  {item.buttonText}
                </motion.button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <Info />

      <CommunityForm />
    </div>
  );
};

export default Extra;
