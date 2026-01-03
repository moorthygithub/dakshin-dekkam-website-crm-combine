import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function GallerySection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const galleryImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=500&fit=crop",
      title: "Community Events",
      category: "Celebrations",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop",
      title: "Cultural Programs",
      category: "Heritage",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=500&fit=crop",
      title: "Workshops",
      category: "Learning",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=500&fit=crop",
      title: "Social Gatherings",
      category: "Bonding",
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=500&fit=crop",
      title: "Educational Events",
      category: "Knowledge",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
    );
  };

  const currentImage = galleryImages[currentSlide];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-amber-25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold mb-4">
            Our Gallery
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Gallery Moments
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore the vibrant memories and beautiful moments from our thriving
            community
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-orange-300 mx-auto rounded-full mt-6"></div>
        </div>

        {/* Main Carousel */}
        <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden mb-12">
          {/* Image Container */}
          <div className="relative h-80 sm:h-96 md:h-[500px] overflow-hidden group">
            <img
              src={currentImage.src}
              alt={currentImage.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <span className="inline-block px-3 py-1 bg-amber-400/90 text-amber-950 text-xs font-bold rounded-full mb-3">
                {currentImage.category}
              </span>
              <h3 className="text-2xl md:text-4xl font-bold text-white">
                {currentImage.title}
              </h3>
            </div>

            {/* Slide Counter */}
            <div className="absolute top-6 right-6 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-semibold">
              {String(currentSlide + 1).padStart(2, "0")} /{" "}
              {String(galleryImages.length).padStart(2, "0")}
            </div>
          </div>

          {/* Navigation Controls - Centered Below */}
          <div className="flex items-center justify-between px-8 py-6 bg-gradient-to-r from-amber-50 to-orange-50">
            <button
              onClick={prevSlide}
              aria-label="Previous image"
              className="group flex items-center gap-2 px-5 py-3 bg-white border-2 border-amber-200 text-amber-700 font-semibold rounded-xl hover:bg-amber-400 hover:border-amber-500 hover:text-white transition-all duration-300 shadow-sm"
            >
              <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            {/* Progress Bar */}
            <div className="flex-1 mx-6 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-orange-300 transition-all duration-500"
                style={{
                  width: `${
                    ((currentSlide + 1) / galleryImages.length) * 100
                  }%`,
                }}
              ></div>
            </div>

            <button
              onClick={nextSlide}
              aria-label="Next image"
              className="group flex items-center gap-2 px-5 py-3 bg-white border-2 border-amber-200 text-amber-700 font-semibold rounded-xl hover:bg-amber-400 hover:border-amber-500 hover:text-white transition-all duration-300 shadow-sm"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Thumbnail Navigation */}
        <div className="flex gap-3 overflow-x-auto !py-4 !px-2">
          {galleryImages.map((image, idx) => (
            <button
              key={image.id}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to ${image.title}`}
              className={`flex-shrink-0 h-20 w-24 rounded-xl overflow-hidden transition-all duration-300 border-2 ${
                idx === currentSlide
                  ? "border-amber-500 ring-2 ring-amber-300 shadow-lg scale-105"
                  : "border-gray-200 hover:border-amber-200 opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
