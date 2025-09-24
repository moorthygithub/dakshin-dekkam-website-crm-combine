import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState, useRef } from "react";
import ProgressDots from "./ProgressDots";

const COMMITTEE_MEMBERS = [
  { name: "Punamchand L Dharamshi", role: "President", place: "Hubli" },
  { name: "Satish Devji Shah", role: "Hon. Secretary", place: "Bangalore" },
  { name: "Kirti Dhanji Dharamshi", role: "Treasurer", place: "Bangalore" },
  { name: "Dineshchand K Lodaya", role: "", place: "Gadag" },
  { name: "Harish S Munavar", role: "", place: "Gadag" },
  { name: "Sharad H Momaya", role: "", place: "Hubli" },
  { name: "Kishor Shamji Kuruwe", role: "", place: "Cochin" },
  { name: "Hemang M Momaya", role: "Vice President", place: "Hyderabad" },
  { name: "Mulchand P Shah", role: "Vice President", place: "Badagara" },
  { name: "Pradip Ratila Lodaya", role: "Vice President", place: "Coimbatore" },
  { name: "Rajendra D Shah", role: "", place: "Bangalore" },
  { name: "Dhirish Momaya", role: "", place: "Bangalore" },
  { name: "Hiren Mulji Patel", role: "", place: "Hyderabad" },
  { name: "Hema Gulab Chheda", role: "", place: "Bangalore" },
];

const CO_OPT_MEMBERS = [
  { name: "Bharat L Dharamshi", role: "Joint Secretary", place: "Hubli" },
  { name: "Mitesh P Lodaya", role: "Joint Secretary", place: "Bangalore" },
  { name: "Satish P Luthia", role: "Joint Treasurer", place: "Gadag" },
  { name: "Litin N Lodaya", role: "", place: "Coimbatore" },
  { name: "Sujeev J Soni", role: "", place: "Gadag" },
  { name: "Hiren K Chheda", role: "", place: "Hubli" },
  { name: "Chetan S Munvar", role: "", place: "Bellary" },
];

const Card = ({ person, isAlt }) => (
  <div
    className={`rounded-xl shadow-md p-6 text-center border transition transform hover:scale-105 cursor-pointer hover:shadow-lg ${
      isAlt ? "bg-gray-50" : "bg-white"
    }`}
  >
    <h3 className="font-semibold text-gray-800 text-base mb-2">
      {person.name}
    </h3>
    <p className="text-yellow-600 text-sm font-medium mb-3">
      {person.role || "-"}
    </p>
    {person.place && (
      <p className="text-sm font-medium text-blue-600 bg-blue-100 inline-block px-3 py-1 rounded-full">
        {person.place}
      </p>
    )}
  </div>
);

const CommitteeGrid = () => {
  const coOptRef = useRef(null);
  const committeeRef = useRef(null);
  const [coOptIndex, setCoOptIndex] = useState(0);
  const [committeeIndex, setCommitteeIndex] = useState(0);
  const [coOptPaused, setCoOptPaused] = useState(false);
  const [committeePaused, setCommitteePaused] = useState(false);
  const [coOptProgress, setCoOptProgress] = useState(0);
  const [committeeProgress, setCommitteeProgress] = useState(0);

  const autoplaySpeed = 3000;
  const intervalTime = 50;

  useEffect(() => {
    const interval = setInterval(() => {
      if (!coOptPaused) {
        setCoOptProgress((prev) => {
          if (prev >= 100) {
            const next = (coOptIndex + 1) % CO_OPT_MEMBERS.length;
            setCoOptIndex(next);
            coOptRef.current?.slickGoTo(next);
            return 0;
          }
          return prev + (intervalTime / autoplaySpeed) * 100;
        });
      }
    }, intervalTime);
    return () => clearInterval(interval);
  }, [coOptIndex, coOptPaused]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!committeePaused) {
        setCommitteeProgress((prev) => {
          if (prev >= 100) {
            const next = (committeeIndex + 1) % COMMITTEE_MEMBERS.length;
            setCommitteeIndex(next);
            committeeRef.current?.slickGoTo(next);
            return 0;
          }
          return prev + (intervalTime / autoplaySpeed) * 100;
        });
      }
    }, intervalTime);
    return () => clearInterval(interval);
  }, [committeeIndex, committeePaused]);

  const sliderSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 600,
    autoplay: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  const handleCoOptDotClick = (idx) => {
    setCoOptIndex(idx);
    coOptRef.current?.slickGoTo(idx);
    setCoOptProgress(0);
  };

  const handleCommitteeDotClick = (idx) => {
    setCommitteeIndex(idx);
    committeeRef.current?.slickGoTo(idx);
    setCommitteeProgress(0);
  };

  return (
    <section className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-4">
        OUR ASSOCIATED MEMBERS{" "}
        <span className="text-yellow-500">2024 - 2025</span>
      </h1>
      <p className="text-center text-gray-500 mb-12">
        Dedicated members serving the community
      </p>

      <div
        onMouseEnter={() => setCoOptPaused(true)}
        onMouseLeave={() => setCoOptPaused(false)}
        onTouchStart={() => setCoOptPaused(true)}
        onTouchEnd={() => setCoOptPaused(false)}
        onTouchCancel={() => setCoOptPaused(false)}
        onPointerDown={() => setCoOptPaused(true)}
        onPointerUp={() => setCoOptPaused(false)}
      >
        <h2 className="text-2xl font-semibold mb-6">Associated Members</h2>
        <Slider ref={coOptRef} {...sliderSettings}>
          {CO_OPT_MEMBERS.map((p, i) => (
            <div key={i} className="px-2 my-1">
              <Card person={p} isAlt={i % 2 === 0} />
            </div>
          ))}
        </Slider>
        <div className="flex justify-center mt-3">
          <ProgressDots
            slidesCount={CO_OPT_MEMBERS.length}
            activeIndex={coOptIndex}
            progress={coOptProgress}
            onDotClick={handleCoOptDotClick}
          />
        </div>
      </div>
      {/* Committee Members */}
      <h2 className="text-2xl font-semibold mt-12 mb-6">Committee Members</h2>
      <div
        // onMouseEnter={() => setCommitteePaused(true)}
        // onMouseLeave={() => setCommitteePaused(false)}
        // onTouchStart={() => setCommitteePaused(true)}
        // onTouchEnd={() => setCommitteePaused(false)}
        onMouseEnter={() => setCommitteePaused(true)}
        onMouseLeave={() => setCommitteePaused(false)}
        onTouchStart={() => setCommitteePaused(true)}
        onTouchEnd={() => setCommitteePaused(false)}
        onTouchCancel={() => setCommitteePaused(false)}
        onPointerDown={() => setCommitteePaused(true)}
        onPointerUp={() => setCommitteePaused(false)}
      >
        <Slider ref={committeeRef} {...sliderSettings}>
          {COMMITTEE_MEMBERS.map((p, i) => (
            <div key={i} className="px-2 my-1">
              <Card person={p} isAlt={i % 2 === 0} />
            </div>
          ))}
        </Slider>
        <div className="flex justify-center mt-3">
          <ProgressDots
            slidesCount={COMMITTEE_MEMBERS.length}
            activeIndex={committeeIndex}
            progress={committeeProgress}
            onDotClick={handleCommitteeDotClick}
          />
        </div>
      </div>
      
    </section>
  );
};

export default CommitteeGrid;
