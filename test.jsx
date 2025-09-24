import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState, useRef } from "react";
import ProgressDots from "./ProgressDots"; // Make sure this exists

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
    </p>
  </div>
);

const CommitteeGrid = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const sliderRef = useRef(null);

  const autoplaySpeed = 3000;
  const intervalTime = 50; // 50ms per update

  // Progress bar effect
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          sliderRef.current.slickNext(); // move to next slide
          return 0;
        }
        return prev + (intervalTime / autoplaySpeed) * 100;
      });
    }, intervalTime);
    return () => clearInterval(interval);
  }, []);

  const sliderSettings = {
    dots: false, // we use custom progress dots
    arrows: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (_, next) => {
      setActiveIndex(next);
      setProgress(0);
    },
  };

  return (
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

        {/* Mobile: Slider with progress dots */}
        <div >
          <Slider ref={sliderRef} {...sliderSettings}>
            {COMMITTEE_MEMBERS.map((person, idx) => (
              <div key={idx} className="px-2">
                <Card person={person} />
              </div>
            ))}
          </Slider>
          <ProgressDots
            slidesCount={COMMITTEE_MEMBERS.length}
            activeIndex={activeIndex}
            progress={progress}
          />
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

        {/* Mobile: Slider with progress dots */}
        <div >
          <Slider ref={sliderRef} {...sliderSettings}>
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
          />
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {CO_OPT_MEMBERS.map((person, idx) => (
            <Card key={idx} person={person} isAlt />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommitteeGrid;
