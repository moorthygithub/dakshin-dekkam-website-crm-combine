// HeroSub.jsx
import React from "react";
import Breadcrumb from "./Breadcrumb";

const HeroSub = ({ title, description, breadcrumbLinks }) => {
  return (
    <header className="relative bg-cream max-w-full">
      <section className="relative z-20 pt-24 pb-16 lg:pt-28 lg:pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1
              className="text-4xl md:text-6xl font-bold text-gray-900"
              data-aos="fade-right"
            >
              {title}
            </h1>

            {description && (
              <p
                className="mt-4 md:text-xl text-lg text-gray-600"
                data-aos="fade-down"
                data-aos-delay="300"
              >
                {description}
              </p>
            )}

            <div className="mt-6" data-aos="fade-up" data-aos-delay="700">
              <Breadcrumb links={breadcrumbLinks} />
            </div>
          </div>
        </div>
      </section>

      <div className="text-white -mt-14 sm:-mt-24 lg:-mt-36 z-0 relative">
        <svg
          className="xl:h-40 xl:w-full"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z"
            fill="currentColor"
          ></path>
        </svg>
        <div className="bg-white w-full h-20 -mt-px"></div>
      </div>

      {/* <div className="bg-white h-12 relative z-0" /> */}
    </header>
  );
};

export default HeroSub;
