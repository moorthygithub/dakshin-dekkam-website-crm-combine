import GallerySection from "@/website/components/Bhavan/GallerySection";
import VenueWebsite from "@/website/components/Bhavan/VenueWebsite";
import AOS from "aos";
import "aos/dist/aos.css";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Testimonials from "./Testimonials";
import MiddleBanner from "@/website/components/Bhavan/MiddleBanner";
import Occasion from "@/website/components/Bhavan/Occasion";

export default function BhavanWebsite() {
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      offset: 100,
    });
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-0 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div
            className="absolute -bottom-8 left-20 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto w-full px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Image */}
            <div
              className="flex justify-center order-2 lg:order-1"
              data-aos="fade-right"
            >
              <div className="relative w-full max-w-md h-96 lg:h-[500px]">
                <div className="absolute -inset-4 bg-gradient-to-r from-amber-200 to-orange-200 rounded-3xl opacity-40 blur-xl"></div>
                <img
                  src="/img/bhavan.png"
                  alt="Bhavan Building"
                  className="relative w-full h-full object-cover rounded-md shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-500"
                />
              </div>
            </div>

            {/* Right Content */}
            <div className="space-y-8 order-1 lg:order-2" data-aos="fade-left">
              <div>
                {/* <div className="inline-block mb-4 px-4 py-2 bg-amber-100 rounded-full border border-amber-300">
                  <span className="text-amber-900 text-sm font-semibold">
                    Welcome to Bhavan
                  </span>
                </div> */}

                {/* Heading */}
                <h1 className="text-3xl font-bold text-gray-900 mb-4 ">
                  Know More About
                  <span className="text-amber-700 ml-2">Kutchi Bhavan ? </span>
                  {/* <p className="text-amber-700">Kutchi Bhavan</p> */}
                </h1>

                <div
                  className={`text-sm text-gray-700 text-justify transition-all duration-500 ${
                    showMore
                      ? "max-h-[2000px]"
                      : "max-h-[380px] overflow-hidden"
                  }`}
                >
                  <p className="mb-4">
                    Kutchi Bhavan, JP Nagar, Bangalore, is an idyllic venue
                    perfect for hosting grand celebrations and memorable
                    occasions. With spacious halls of varying capacities, the
                    venue comfortably accommodates both intimate gatherings and
                    large-scale events.
                  </p>

                  <p className="mb-4">
                    The venue offers complete flexibility when it comes to
                    catering. You are free to hire a caterer of your choice to
                    serve delicious, high-quality vegetarian cuisine. In-house
                    decorators are also available to enhance the ambience and
                    add a charming touch to your special event.
                  </p>

                  <p className="mb-4">
                    Conveniently located just off 1st Main Road and only 5min
                    walk from the Jaydeva Metro Station, Kutchi Bhavan is easily
                    accessible for guests. The professional and attentive staff
                    ensures every detail is taken care of, allowing you to
                    celebrate stress-free.
                  </p>

                  <p className="mb-3 font-semibold">
                    Events that can be organized here:
                  </p>

                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Weddings & Wedding Receptions</li>
                    <li>Engagements, Sangeet, Mehndi & Haldi ceremonies</li>
                    <li>Birthday parties & Wedding anniversaries</li>
                    <li>Baby showers & Family celebrations</li>
                    <li>Corporate meetings & Outdoor corporate events</li>
                  </ul>

                  <p>
                    Additional facilities include changing rooms and limited
                    lodging rooms for added convenience. Kutchi Bhavan allows
                    you to celebrate your most important moments in a beautiful
                    setting, creating memories that will be cherished for a
                    lifetime.
                  </p>
                </div>

                {/* Toggle Button */}
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="mt-4 text-amber-700 font-semibold hover:text-amber-900 transition"
                >
                  {showMore ? "Show Less" : "Show More"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <VenueWebsite />
      <MiddleBanner />
      <Testimonials />
      <Occasion />
      <GallerySection />
    </div>
  );
}
