import { COMMITTE_MEMBER } from "@/api";
import { useGetApiMutation } from "@/hooks/useGetApiMutation";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import TeamSkeletonCard from "./TeamSkeletonCard";

const TeamCarousel = () => {
  const {
    data: committedata,
    isLoading,
  } = useGetApiMutation({
    url: COMMITTE_MEMBER,
    queryKey: ["commmittemember"],
  });

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  const members = committedata?.data || [];
  const noImage = committedata?.image_url?.find(
    (i) => i.image_for === "No Image"
  )?.image_url;
  const baseImage = committedata?.image_url?.find(
    (i) => i.image_for === "Committee"
  )?.image_url;

  return (
    <section className="container mx-auto px-4 lg:px-8 pb-12 text-gray-700">
      <div data-aos="flip-up" className="max-w-xl mx-auto text-center mt-24">
        <h1 className="font-bold text-darken my-3 text-2xl">
          Meet the <span className="text-yellow-500">Team.</span>
        </h1>
        <p className="leading-relaxed text-gray-500">
          Meet our amazing chairperson and team members.
        </p>
      </div>

      <Slider {...settings} className="mt-12">
        {isLoading
          ? Array.from({ length: 6 }).map((_, idx) => (
              <TeamSkeletonCard key={idx} />
            ))
          : members.map((member, idx) => {
              const imgSrc = member.committee_member_images
                ? `${baseImage}${member.committee_member_images}`
                : noImage;

              return (
                <div
                  key={idx}
                  className="px-4"
                  data-aos="fade-up"
                  data-aos-delay={idx * 150}
                >
                  <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center hover:shadow-2xl transition duration-300 my-2">
                    {/* Profile Image */}
                    <div className="w-20 h-20 mb-4 rounded-full overflow-hidden border-4 border-yellow-400 shadow-md">
                      <img
                        src={imgSrc}
                        alt={member.committee_member}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Name + Role + Year */}
                    <h3 className="text-lg font-bold text-gray-800">
                      {member.committee_member}
                    </h3>
                    <p className="text-sm text-yellow-600 font-medium">
                      {member.committee_type}
                    </p>
                    <p className="text-sm text-gray-500">
                      {member.committee_year}
                    </p>

                    {/* Decorative line */}
                    <div className="mt-4 w-10 h-1 bg-yellow-400 rounded-full"></div>
                  </div>
                </div>
              );
            })}
      </Slider>
    </section>
  );
};

export default TeamCarousel;
