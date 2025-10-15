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
import { useEffect, useState } from "react";
import { useRef } from "react";
import ProgressDots from "../About/ProgressDots";
import SingleTestimonial from "../components/SingleTestimonial";
import { TestimonialData } from "../data/testimonial";
import ImageSlider from "../components/ImageCarsol";
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

const COMMITTEE_MEMBERS = [
  { name: "Punamchand L Dharamshi", role: "President", place: "Hubli" },
  { name: "Satish Devji Shah", role: "Hon. Secretary", place: "Bangalore" },
  { name: "Kirti Dhanji Dharamshi", role: "Treasurer", place: "Bangalore" },
  { name: "Dineshchand K Lodaya", role: "Member", place: "Gadag" },
  { name: "Harish S Munavar", role: "Member", place: "Gadag" },
  { name: "Sharad H Momaya", role: "Member", place: "Hubli" },
  { name: "Kishor Shamji Kuruwe", role: "Member", place: "Cochin" },
  { name: "Hemang M Momaya", role: "Member", place: "" },
  { name: "Mulchand P Shah", role: "Member", place: "" },
  { name: "Pradip Ratila Lodaya", role: "Member", place: "" },
  { name: "Rajendra D Shah", role: "Member", place: "Bangalore" },
  { name: "Dhirish Momaya", role: "Member", place: "Bangalore" },
  { name: "Hiren Mulji Patel", role: "Member", place: "Hyderabad" },
  { name: "Hema Gulab Chheda", role: "Member", place: "Bangalore" },
];

const CO_OPT_MEMBERS = [
  { name: "Bharat L Dharamshi", role: "Joint Secretary", place: "Hubli" },
  { name: "Mitesh P Lodaya", role: "Joint Secretary", place: "Bangalore" },
  { name: "Satish P Luthia", role: "Joint Treasurer", place: "Gadag" },
  { name: "Litin N Lodaya", role: "Co-Opt. Member", place: "Coimbatore" },
  { name: "Sujeev J Soni", role: "Co-Opt. Member", place: "Gadag" },
  { name: "Hiren K Chheda", role: "Co-Opt. Member", place: "Hubli" },
  { name: "Chetan S Munvar", role: "Co-Opt. Member", place: "Bellary" },
];
const Card = ({ person, isAlt }) => (
  <div
    className={`rounded-xl shadow-md p-6 my-1 text-center border hover:shadow-lg transition ${
      isAlt ? "bg-gray-50" : "bg-white"
    }`}
  >
    <img
      src="/img/profile.png"
      alt={person.name}
      className="w-20 h-20 mx-auto rounded-full object-cover mb-4"
    />
    <h3 className="font-bold text-gray-800 text-sm">{person.name}</h3>
    <p className="text-xs text-yellow-600 font-medium">{person.role}</p>
    <p className="text-xs text-gray-500 min-h-[16px]">
      {person.place || "\u00A0"}
    </p>{" "}
  </div>
);
const Extra = () => {
  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const autoplaySpeed = 3000;
  const intervalTime = 50; // update every 50ms

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          const nextIndex = (activeIndex + 1) % CO_OPT_MEMBERS.length;
          setActiveIndex(nextIndex);
          sliderRef.current?.slickGoTo(nextIndex); // move slider
          return 0;
        }
        return prev + (intervalTime / autoplaySpeed) * 100;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [activeIndex]);
  const sliderSettings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 4, // show 4 cards at once on large screens
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // tablets
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768, // mobile
        settings: { slidesToShow: 1 },
      },
    ],
  };
  const sliderSettingsone = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 4, // show 4 cards at once on large screens
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // tablets
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768, // mobile
        settings: { slidesToShow: 1 },
      },
    ],
  };
  const handleDotClick = (index) => {
    setActiveIndex(index);
    sliderRef.current?.slickGoTo(index);
    setProgress(0); // reset progress
  };
  const settings = {
    autoplay: true,
    dots: false,
    arrows: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
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
      <div className="w-[300px] h-[300px] py-4 mx-auto">
        <h1 className="text-3xl font-bold">Image SLiders</h1>
        <ImageSlider />
      </div>
      <h1 className="text-3xl font-bold">Card sliders</h1>
      <div className="bg-white shadow-xl rounded-xl p-6 w-96 mt-20 mx-auto">
        <Slider {...settings}>
          {TestimonialData.map((item, index) => (
            <SingleTestimonial
              key={index}
              review={item.review}
              image={item.Image}
              name={item.name}
              post={item.post}
            />
          ))}
        </Slider>
      </div>
      <CommunityForm />
      <section className="relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-xl mx-auto text-center">
            <h1 className="font-bold text-darken my-3 text-2xl">
              OUR ASSOCIATED MEMBERS{" "}
              <span className="text-yellow-500">2022 - 2023</span>
            </h1>
            <p className="text-gray-500">
              Dedicated members serving the community
            </p>
          </div>

          {/* Committee Members */}
          <h2 className="text-xl font-semibold text-center mt-12 mb-6">
            Committee Members
          </h2>

          {/* Mobile: Slider */}
          <div className="block md:hidden">
            <Slider {...sliderSettings}>
              {COMMITTEE_MEMBERS.map((person, idx) => (
                <div key={idx} className="px-2">
                  <Card person={person} />
                </div>
              ))}
            </Slider>
          </div>

          {/* Desktop: Grid */}
          <div className="hidden md:grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {COMMITTEE_MEMBERS.map((person, idx) => (
              <Card key={idx} person={person} />
            ))}
          </div>

          {/* Co-opt Members */}
          <h2 className="text-xl font-semibold text-center mt-16 mb-6">
            Co-Opted Members
          </h2>

          {/* Mobile: Slider */}
          <div className="block md:hidden">
            <Slider {...sliderSettings}>
              {CO_OPT_MEMBERS.map((person, idx) => (
                <div key={idx} className="px-2">
                  <Card person={person} isAlt />
                </div>
              ))}
            </Slider>
          </div>

          {/* Desktop: Grid */}
          <div className="hidden md:grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {CO_OPT_MEMBERS.map((person, idx) => (
              <Card key={idx} person={person} isAlt />
            ))}
          </div>
          <section className="relative">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="max-w-xl mx-auto text-center">
                <h1 className="font-bold text-darken my-3 text-2xl">
                  OUR ASSOCIATED MEMBERS{" "}
                  <span className="text-yellow-500">2022 - 2023</span>
                </h1>
                <p className="text-gray-500">
                  Dedicated members serving the community
                </p>
              </div>

              {/* Committee Members */}
              <h2 className="text-xl font-semibold text-center mt-12 mb-6">
                Committee Members
              </h2>
              <Slider {...sliderSettings}>
                {COMMITTEE_MEMBERS.map((person, idx) => (
                  <div key={idx} className="px-2">
                    <Card person={person} />
                  </div>
                ))}
              </Slider>

              {/* Co-opt Members */}
              <h2 className="text-xl font-semibold text-center mt-16 mb-6">
                Co-Opted Members
              </h2>
              <Slider ref={sliderRef} {...sliderSettingsone}>
                {CO_OPT_MEMBERS.map((person, idx) => (
                  <div key={idx} className="px-2">
                    <Card person={person} isAlt />
                  </div>
                ))}
              </Slider>
              <ProgressDots
                slidesCount={CO_OPT_MEMBERS.length}
                activeIndex={activeIndex}
                progress={progress}
                onDotClick={handleDotClick}
              />
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default Extra;
