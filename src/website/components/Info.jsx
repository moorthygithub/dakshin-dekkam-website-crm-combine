import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { TestimonialData } from "../data/testimonial";
import SingleTestimonial from "./SingleTestimonial";
import MemberForm from "./Member/MemberForm";

const Info = () => {
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
    <section className="relative py-20 bg-gray-50">
      <div className="container mx-auto max-w-screen-xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Section: Title + Slider */}
          <div className="lg:col-span-5 text-black" data-aos="fade-right">
            <div className="flex items-center relative mb-6">
              <div className="bg-yellow-400 rounded-full w-12 h-12 absolute -left-4 -top-3 animate-pulse"></div>
              <h2 className="font-bold text-2xl relative z-10 text-darken">
                Join Us Now
              </h2>
            </div>

            <h1 className="text-4xl font-extrabold text-darken mb-8">
              <span className="text-yellow-500">Ready</span> to try our app for
              free?
            </h1>

            {/* Testimonial Slider */}
            <div className="bg-white shadow-xl rounded-xl p-6">
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
          </div>

          <div className="lg:col-span-7 relative flex justify-center items-center">
            <div className="relative w-full max-w-md bg-white rounded-2xl p-8 lg:p-12 shadow-lg overflow-hidden">
              <MemberForm />
              <div className="absolute -top-8 -left-8 w-24 h-24 rounded-full bg-green-400 animate-pulse opacity-70"></div>
              <div className="absolute top-6 -right-6 w-8 h-8 rounded-full bg-blue-400 animate-ping opacity-80"></div>
              <div className="absolute -bottom-8 -right-8 w-20 h-20 rounded-full bg-indigo-500 animate-pulse opacity-70"></div>
              <div className="absolute -bottom-10 left-4 w-12 h-12 rounded-full bg-red-400 animate-ping opacity-80"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Info;
