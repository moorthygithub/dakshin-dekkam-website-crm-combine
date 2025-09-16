import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const teamMembers = [
  {
    name: "John Doe",
    role: "CEO",
    company: "Company A",
    img: "/img/profile.png",
    description:
      "Lorem ipsum dolor sit amet et delectus accommodare his consul copiosae legendos",
  },
  {
    name: "Jane Smith",
    role: "CTO",
    company: "Company B",
    img: "/img/profile.png",
    description:
      "Lorem ipsum dolor sit amet et delectus accommodare his consul copiosae legendos",
  },
  {
    name: "Mark Wilson",
    role: "Designer",
    company: "Company C",
    img: "/img/profile.png",
    description:
      "Lorem ipsum dolor sit amet et delectus accommodare his consul copiosae legendos",
  },
  {
    name: "Lucy Brown",
    role: "Developer",
    company: "Company D",
    img: "/img/profile.png",
    description:
      "Lorem ipsum dolor sit amet et delectus accommodare his consul copiosae legendos",
  },
];

const TeamCarousel = () => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="container mx-auto px-4 lg:px-8 py-12 text-gray-700 ">
      <div data-aos="flip-up" className="max-w-xl mx-auto text-center mt-24">
        <h1 className="font-bold text-darken my-3 text-2xl">
          Meet the <span className="text-yellow-500">Team.</span>
        </h1>
        <p className="leading-relaxed text-gray-500">
          Meet our amazing chairperson and team members.
        </p>
      </div>

      <Slider {...settings} className="space-x-4 mt-12">
        {teamMembers.map((member, idx) => (
          <div
            key={idx}
            className="px-2 py-2"
            data-aos="fade-up"
            data-aos-delay={idx * 150}
          >
            <div className="bg-cream rounded-lg shadow-md p-6 flex flex-col">
              {member.description && (
                <p className="mb-4 text-gray-700 text-center">
                  {member.description}
                </p>
              )}

              <div className="grid grid-cols-3 gap-4 items-start w-full">
                <div className="flex justify-start col-span-1">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>

                <div className="flex flex-col justify-start items-center col-span-2">
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-sm text-gray-500">{member.company}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default TeamCarousel;
