import GallerySection from "@/website/components/Bhavan/GallerySection";
import {
  ArrowRight,
  BookOpen,
  MapPin,
  Star,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import VenueWebsite from "@/website/components/Bhavan/VenueWebsite";

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
                  className="relative w-full h-full object-cover rounded-3xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-500"
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

                {/* Description */}
                <p
                  className={`text-xl text-gray-700 text-justify transition-all duration-500 ${
                    showMore
                      ? "max-h-[2000px]"
                      : "max-h-[380px] overflow-hidden"
                  }`}
                >
                  Kutchi Bhavan, JP Nagar, Bangalore, makes for an idyllic venue
                  for grandiose weddings, receptions, birthday parties, wedding
                  anniversaries, sangeet, mehndi, haldi, rasam, and engagement
                  parties, baby showers, and even outdoor corporate events. The
                  halls offered by the venue are of varying capacities and can
                  accommodate a large number of guests. At Kutchi Bhavan,
                  Bangalore, you have the complete liberty to hire a caterer of
                  your choice to serve delicious and good quality vegetarian
                  food. The team of in-house decorators at the venue provides
                  decor that adds a charming look to your special event. This
                  elegant venue is located just off 1st Main Road and about 10
                  minutes away from Rashtriya Vidyalaya Road Metro Station. The
                  helpful staff here takes care of your requirements so nothing
                  falls short during the celebrations of your special day. You
                  can avail of the changing rooms and a few lodging rooms that
                  the venue offers. The gorgeous venue lets you beautifully
                  celebrate your most important days. You will go home with a
                  ton of happy memories to cherish for an entire lifetime.
                </p>

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
      <div data-aos="fade-up">
        <GallerySection />
      </div>
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
