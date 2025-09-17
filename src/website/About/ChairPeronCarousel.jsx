import { COMMITTE_MEMBER } from "@/api";
import { useGetApiMutation } from "@/hooks/useGetApiMutation";
import ChairPersonSkeletonCard from "./ChairPersonSkeletonCard";
import MemberPerson from "./MemberPerson";

const ChairPersonCarousel = () => {
  const {
    data: committedata,
    isLoading,
    isError,
  } = useGetApiMutation({
    url: COMMITTE_MEMBER,
    queryKey: ["commmittemember"],
  });

  const chairPersons =
    committedata?.data?.filter(
      (m) => !m.committee_type.toLowerCase().includes("member")
    ) || [];

  const noImage = committedata?.image_url?.find(
    (i) => i.image_for === "No Image"
  )?.image_url;
  const baseImage = committedata?.image_url?.find(
    (i) => i.image_for === "Committee"
  )?.image_url;

  return (
    <section className="relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div data-aos="flip-up" className="max-w-xl mx-auto text-center mt-24">
          <h1 className="font-bold text-darken my-3 text-2xl">
            Our <span className="text-yellow-500">Community.</span>
          </h1>
          <p className="leading-relaxed text-gray-500">
            Meet our amazing community for the year{" "}
            {chairPersons[0]?.committee_year || ""}
          </p>
        </div>

        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 mt-20">
          {isLoading
            ? Array.from({ length: chairPersons.length || 6 }).map((_, idx) => (
                <ChairPersonSkeletonCard key={idx} />
              ))
            : chairPersons.map((person, index) => {
                const imgSrc = person.committee_member_images
                  ? `${baseImage}${person.committee_member_images}`
                  : noImage;

                return (
                  <div
                    key={index}
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                    className="relative rounded-xl shadow-lg overflow-hidden group transition-transform duration-500 hover:scale-105"
                    style={{
                      backgroundImage: `url(${imgSrc})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition"></div>

                    <div className="relative z-10 p-2 text-center text-white flex flex-col items-center justify-end h-56">
                      <h3 className="text-[14px] md:text-md font-bold">
                        {person.committee_member}
                      </h3>
                      <p className="text-xs font-medium text-yellow-300">
                        {person.committee_type}
                      </p>
                      {/* <p className="text-xs text-gray-200">
                        {person.committee_year}
                      </p> */}
                    </div>
                  </div>
                );
              })}
        </div>
        <MemberPerson committedata={committedata} isLoading={isLoading} />
      </div>
    </section>
  );
};

export default ChairPersonCarousel;
