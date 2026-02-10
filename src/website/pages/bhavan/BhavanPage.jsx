import GallerySection from "@/website/components/Bhavan/GallerySection";
import VenueWebsite from "@/website/components/Bhavan/VenueWebsite";
import AOS from "aos";
import "aos/dist/aos.css";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

  const testimonials = [
    {
      name: "Priya & Raj",
      event: "Wedding Reception",
      text: "The venue exceeded our expectations! The staff was incredibly helpful, and our guests loved the ambiance.",
      rating: 5,
    },
    {
      name: "Tech Solutions Inc.",
      event: "Annual Conference",
      text: "Perfect location for our 300+ attendee conference. The audio-visual equipment was top-notch.",
      rating: 5,
    },
    {
      name: "Meera Shah",
      event: "Birthday Celebration",
      text: "Beautiful venue with excellent catering options. Made my mother's 60th birthday truly special.",
      rating: 5,
    },
  ];

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
                {/* Badge */}
                <div className="inline-block mb-4 px-4 py-2 bg-amber-100 rounded-full border border-amber-300">
                  <span className="text-amber-900 text-sm font-semibold">
                    Welcome to Bhavan
                  </span>
                </div>

                {/* Heading */}
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Know More About
                  <p className="text-amber-700">Kutchi Bhavan</p>
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
                    Conveniently located just off 1st Main Road and only 10
                    minutes from Rashtriya Vidyalaya Road Metro Station, Kutchi
                    Bhavan is easily accessible for guests. The professional and
                    attentive staff ensures every detail is taken care of,
                    allowing you to celebrate stress-free.
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
      <GallerySection />

      <VenueWebsite />
      <div data-aos="fade-up"></div>
      <section id="testimonials" className="bg-white mb-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-300 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-amber-50 p-8 rounded-2xl shadow-md hover:shadow-lg transition"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div className="border-t border-amber-200 pt-4">
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
