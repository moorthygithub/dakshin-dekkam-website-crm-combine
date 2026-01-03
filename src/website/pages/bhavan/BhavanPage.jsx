// import GallerySection from "@/website/components/Bhavan/GallerySection";
// import { ArrowRight, BookOpen, MapPin, Users } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// export default function BhavanWebsite() {
//   const navigate = useNavigate();

//   const features = [
//     {
//       icon: <Users className="w-10 h-10" />,
//       title: "100+ Members",
//       description: "Active community of engaged members",
//     },
//     {
//       icon: <MapPin className="w-10 h-10" />,
//       title: "Prime Location",
//       description: "Hotels & amenities nearby",
//     },
//     {
//       icon: <BookOpen className="w-10 h-10" />,
//       title: "Rich Programs",
//       description: "Diverse cultural & educational activities",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-white overflow-hidden">
//       {/* Hero Section */}
//       <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
//         <div className="absolute inset-0">
//           <div className="absolute top-20 right-0 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
//           <div
//             className="absolute -bottom-8 left-20 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"
//             style={{ animationDelay: "2s" }}
//           ></div>
//         </div>

//         <div className="relative max-w-7xl mx-auto w-full px-4 py-20">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//             {/* Left Image */}
//             <div className="flex justify-center order-2 lg:order-1">
//               <div className="relative w-full max-w-sm h-96 lg:h-[500px]">
//                 <div className="absolute -inset-4 bg-gradient-to-r from-amber-200 to-orange-200 rounded-3xl opacity-40 blur-xl"></div>
//                 <img
//                   src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=700&fit=crop"
//                   alt="Bhavan Building"
//                   className="relative w-full h-full object-cover rounded-3xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-500"
//                 />
//               </div>
//             </div>

//             {/* Right Content */}
//             <div className="space-y-8 order-1 lg:order-2">
//               <div>
//                 <div className="inline-block mb-4 px-4 py-2 bg-amber-100 rounded-full border border-amber-300">
//                   <span className="text-amber-900 text-sm font-semibold">
//                     Welcome to Bhavan
//                   </span>
//                 </div>
//                 <h1 className="text-5xl lg:text-7xl font-bold text-amber-950 mb-6 leading-tight">
//                   Discover Our <span className="text-amber-700">Community</span>
//                 </h1>
//                 <p className="text-xl text-gray-700 leading-relaxed max-w-lg">
//                   Experience a vibrant community dedicated to cultural
//                   preservation, education, and meaningful connections. Our
//                   Bhavan serves as a hub for members who value tradition,
//                   learning, and togetherness.
//                 </p>
//               </div>

//               <div className="flex flex-col sm:flex-row gap-4 pt-4">
//                 <button
//                   onClick={() => navigate("/bhavan-form")}
//                   className="group px-8 py-4 bg-gradient-to-r from-amber-400 to-orange-300 text-amber-950 font-bold rounded-xl hover:shadow-lg transition duration-300 flex items-center gap-2 text-lg"
//                 >
//                   Book Now
//                   <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
//                 </button>
//                 <button
//                   className="px-8 py-4 border-2 border-amber-700 text-amber-900 font-bold rounded-xl hover:bg-amber-50 transition duration-300 text-lg"
//                   onClick={() => navigate("/aboutus")}
//                 >
//                   Learn More
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
//               Why Choose Bhavan
//             </h2>
//             <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-300 mx-auto rounded-full"></div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {features.map((feature, idx) => (
//               <div
//                 key={idx}
//                 className="group bg-amber-50 p-8 rounded-2xl shadow-sm hover:shadow-lg transition duration-300 border border-amber-200"
//               >
//                 <div className="inline-block p-4 bg-amber-100 text-amber-700 rounded-xl mb-6 group-hover:scale-110 transition duration-300">
//                   {feature.icon}
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-900 mb-3">
//                   {feature.title}
//                 </h3>
//                 <p className="text-gray-700 text-lg">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Gallery Carousel Section */}
//       <GallerySection />
//       {/* CTA Section */}
//       <section className="py-20 bg-gradient-to-r from-amber-100 via-orange-50 to-yellow-100 relative overflow-hidden">
//         <div className="relative max-w-4xl mx-auto px-4 text-center">
//           <h2 className="text-4xl lg:text-5xl font-bold text-amber-950 mb-6">
//             Ready to Join Us?
//           </h2>
//           <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed">
//             Become part of our thriving community and experience the richness of
//             culture, learning, and togetherness.
//           </p>
//           <button
//             onClick={() => navigate("/bhavan-form")}
//             className="group px-10 py-4 bg-gradient-to-r from-amber-400 to-orange-300 text-amber-950 font-bold rounded-xl hover:shadow-lg transition duration-300 text-lg flex items-center gap-2 mx-auto"
//           >
//             Get Started
//             <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
//           </button>
//         </div>
//       </section>
//     </div>
//   );
// }
import GallerySection from "@/website/components/Bhavan/GallerySection";
import { ArrowRight, BookOpen, MapPin, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function BhavanWebsite() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      offset: 100,
    });
  }, []);

  const features = [
    {
      icon: <Users className="w-10 h-10" />,
      title: "100+ Members",
      description: "Active community of engaged members",
    },
    {
      icon: <MapPin className="w-10 h-10" />,
      title: "Prime Location",
      description: "Hotels & amenities nearby",
    },
    {
      icon: <BookOpen className="w-10 h-10" />,
      title: "Rich Programs",
      description: "Diverse cultural & educational activities",
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
              <div className="relative w-full max-w-sm h-96 lg:h-[500px]">
                <div className="absolute -inset-4 bg-gradient-to-r from-amber-200 to-orange-200 rounded-3xl opacity-40 blur-xl"></div>
                <img
                  src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=700&fit=crop"
                  alt="Bhavan Building"
                  className="relative w-full h-full object-cover rounded-3xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-500"
                />
              </div>
            </div>

            {/* Right Content */}
            <div className="space-y-8 order-1 lg:order-2" data-aos="fade-left">
              <div>
                <div className="inline-block mb-4 px-4 py-2 bg-amber-100 rounded-full border border-amber-300">
                  <span className="text-amber-900 text-sm font-semibold">
                    Welcome to Bhavan
                  </span>
                </div>
                <h1 className="text-5xl lg:text-7xl font-bold text-amber-950 mb-6 leading-tight">
                  Discover Our <span className="text-amber-700">Community</span>
                </h1>
                <p className="text-xl text-gray-700 leading-relaxed max-w-lg">
                  Experience a vibrant community dedicated to cultural
                  preservation, education, and meaningful connections. Our
                  Bhavan serves as a hub for members who value tradition,
                  learning, and togetherness.
                </p>
              </div>

              <div
                className="flex flex-col sm:flex-row gap-4 pt-4"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <button
                  onClick={() => navigate("/bhavan-form")}
                  className="group px-8 py-4 bg-gradient-to-r from-amber-400 to-orange-300 text-amber-950 font-bold rounded-xl hover:shadow-lg transition duration-300 flex items-center gap-2 text-lg"
                >
                  Book Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                </button>
                <button
                  className="px-8 py-4 border-2 border-amber-700 text-amber-900 font-bold rounded-xl hover:bg-amber-50 transition duration-300 text-lg"
                  onClick={() => navigate("/aboutus")}
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Bhavan
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-300 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group bg-amber-50 p-8 rounded-2xl shadow-sm hover:shadow-lg transition duration-300 border border-amber-200"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <div className="inline-block p-4 bg-amber-100 text-amber-700 rounded-xl mb-6 group-hover:scale-110 transition duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-700 text-lg">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Carousel Section */}
      <div data-aos="fade-up">
        <GallerySection />
      </div>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-100 via-orange-50 to-yellow-100 relative overflow-hidden">
        <div
          className="relative max-w-4xl mx-auto px-4 text-center"
          data-aos="zoom-in"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-amber-950 mb-6">
            Ready to Join Us?
          </h2>
          <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed">
            Become part of our thriving community and experience the richness of
            culture, learning, and togetherness.
          </p>
          <button
            onClick={() => navigate("/bhavan-form")}
            className="group px-10 py-4 bg-gradient-to-r from-amber-400 to-orange-300 text-amber-950 font-bold rounded-xl hover:shadow-lg transition duration-300 text-lg flex items-center gap-2 mx-auto"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Get Started
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
          </button>
        </div>
      </section>
    </div>
  );
}
