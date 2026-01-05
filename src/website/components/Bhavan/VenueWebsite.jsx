import React, { useState, useEffect } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Calendar,
  Users,
  Music,
  Sparkles,
  UtensilsCrossed,
  Menu,
  X,
  ChevronRight,
  Star,
  Clock,
  Award,
  Heart,
  Zap,
  Utensils,
  Bed,
} from "lucide-react";

export default function VenueWebsite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: <Users className="w-10 h-10" />,
      title: "Main Hall",
      description:
        "Spacious hall with stage available, perfect for large gatherings, conferences, and ceremonies with modern acoustics and flexible seating arrangements.",
      seating: "400",
      capacity: "600",
      highlights: ["Stage Available", "Modern Acoustics"],
    },
    {
      icon: <UtensilsCrossed className="w-10 h-10" />,
      title: "Dining Hall",
      description:
        "Elegant dining space with traditional plantain leaf services allowed. Ideal for formal dinners, receptions, and authentic South Indian celebrations.",
      seating: "150",
      capacity: "250",
      highlights: ["Plantain Leaf Service", "Traditional Setup"],
    },
    {
      icon: <MapPin className="w-10 h-10" />,
      title: "Prime Location",
      description:
        "Centrally located in JP Nagar, Bangalore with excellent connectivity and easy access from all parts of the city.",
      highlights: ["JP Nagar", "Central Location"],
    },
    {
      icon: <Bed className="w-10 h-10" />,
      title: "Rooms",
      description:
        "10 well-appointed rooms available for lodging and changing purposes, ensuring comfort and convenience for your guests.",
      highlights: ["10 Rooms", "Lodging & Changing"],
    },
    {
      icon: <Utensils className="w-10 h-10" />,
      title: "Food Services",
      description:
        "Only vegetarian food allowed. Flexibility to choose between in-house catering or bring your own outside food and caterers.",
      highlights: ["Pure Veg Only", "Outside Catering Allowed"],
    },
    {
      icon: <Zap className="w-10 h-10" />,
      title: "Power Backup",
      description:
        "Uninterrupted power supply with generator backup available at the venue, ensuring your events run smoothly without disruptions.",
      highlights: ["Generator Available", "24/7 Backup"],
    },
    {
      icon: <Music className="w-10 h-10" />,
      title: "Audio & Visual",
      description:
        "Basic sound system included with all bookings. Professional projector available with additional charges for presentations and screenings.",
      highlights: ["Sound System", "Projector Available"],
    },
  ];

  const events = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Weddings",
      description: "Create magical memories in our elegant spaces",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Corporate Events",
      description: "Professional settings for your business gatherings",
    },
    {
      icon: <Music className="w-8 h-8" />,
      title: "Celebrations",
      description: "Perfect venue for birthdays and anniversaries",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Conferences",
      description: "State-of-the-art facilities for seminars",
    },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Our Venue Spaces & Amenities
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-300 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group bg-amber-50 p-8 rounded-2xl shadow-sm hover:shadow-lg transition duration-300 border border-amber-200"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <div className="flex items-center justify-between">
                  <div className="p-4 bg-amber-100 text-amber-700 rounded-xl group-hover:scale-110 transition duration-300">
                    {feature.icon}
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900">
                    {feature.title}
                  </h3>
                </div>

                {/* <p className="text-gray-700 text-base mb-6">
                  {feature.description}
                </p> */}
                {feature.seating && feature.capacity && (
                  <div className="space-y-2 pt-6 border-t border-amber-200 mt-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 font-medium">
                        Seating:
                      </span>
                      <span className="text-amber-700 font-bold">
                        {feature.seating}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 font-medium">
                        Max Capacity:
                      </span>
                      <span className="text-amber-700 font-bold">
                        {feature.capacity}
                      </span>
                    </div>
                  </div>
                )}
                {feature.highlights && (
                  <div className="flex flex-wrap gap-2 pt-4">
                    {feature.highlights.map((highlight, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-amber-200 text-amber-800 text-xs font-semibold rounded-full"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section
        id="events"
        className="py-20 bg-gradient-to-b from-amber-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Perfect for Every Occasion
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-300 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {events.map((event, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 text-center group"
              >
                <div className="inline-block p-4 bg-gradient-to-br from-amber-400 to-orange-300 text-white rounded-full mb-6 group-hover:scale-110 transition">
                  {event.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {event.title}
                </h3>
                <p className="text-gray-600">{event.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
        id="home"
        className="relative h-[70vh] min-h-[380px] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-amber-600 via-orange-500 to-amber-700"></div>
        <div className="absolute inset-0 bg-black opacity-40"></div>

        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Your Dream Event
            <br />
            <span className="text-amber-200">Starts Here</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-amber-100">
            JP Nagar's Premier Venue for Unforgettable Celebrations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/booking-room")}
              className="bg-white text-amber-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-amber-50 transform hover:scale-105 transition shadow-2xl"
            >
              Book Now
              <ChevronRight className="inline ml-2" />
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="#fffbeb"
            />
          </svg>
        </div>
      </section>
    </div>
  );
}
