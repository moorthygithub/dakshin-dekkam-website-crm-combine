import React from "react";

const teamMembers = [
  { name: "Chairperson Name", role: "Chairperson", img: "/img/profile.png" },
  {
    name: "Stefan Mikic",
    role: "Head of Development",
    img: "/img/profile.png",
  },
  { name: "Marko Vukic", role: "Head of Development", img: "/img/profile.png" },
];

const ChairPeronCarousel = () => {
  return (
    <section className="relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div data-aos="flip-up" className="max-w-xl mx-auto text-center mt-24">
          <h1 className="font-bold text-darken my-3 text-2xl">
            Our <span className="text-yellow-500">ChairPerson.</span>
          </h1>
          <p className="leading-relaxed text-gray-500">
            Meet our amazing chairperson and team members.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-20 ">
          {teamMembers.map((member, index) => {
            return (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="bg-yellow-100 rounded-xl shadow-lg p-6 pt-16  text-center flex flex-col items-center relative transition-transform duration-500 mt-12 md:mt-0"
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-28 h-28 rounded-full border-4 border-white shadow-md absolute -top-14 left-1/2 transform -translate-x-1/2 object-cover z-30"
                />
                <h3 className="text-lg font-bold text-gray-900 mt-10">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4">{member.role}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ChairPeronCarousel;
