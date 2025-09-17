import MemberSkeletonCard from "./MemberSkeletonCard";

const MemberPerson = ({ committedata, isLoading }) => {
  const memberPersons =
    committedata?.data?.filter((m) =>
      m.committee_type.toLowerCase().includes("member")
    ) || [];

  const noImage = committedata?.image_url?.find(
    (i) => i.image_for === "No Image"
  )?.image_url;
  const baseImage = committedata?.image_url?.find(
    (i) => i.image_for === "Committee"
  )?.image_url;

  return (
    <section className="relative">
      <div className="container mx-auto">
        <div data-aos="flip-up" className="max-w-xl mx-auto text-center mt-16">
          <h1 className="font-bold text-darken my-3 text-2xl">
            Our <span className="text-yellow-500">Community Members.</span>
          </h1>
          <p className="leading-relaxed text-gray-500">
            Our amazing community for {" "}
            {committedata?.data[0]?.committee_year || ""}
          </p>
        </div>
        <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 mt-20">
          {isLoading
            ? Array.from({ length: memberPersons.length || 8 }).map(
                (_, idx) => <MemberSkeletonCard key={idx} />
              )
            : memberPersons.map((person, index) => {
                const imgSrc = person.committee_member_images
                  ? `${baseImage}${person.committee_member_images}`
                  : noImage;

                return (
                  <div
                    key={index}
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                    className="bg-yellow-100 rounded-xl shadow-lg pt-16 pb-8 md:p-6 md:pt-16 mt-12 lg:mt-0 text-center flex flex-col items-center relative transition-transform duration-500  hover:scale-105 "
                  >
                    <img
                      src={imgSrc}
                      alt={person.committee_member}
                      className="w-24 h-24 rounded-full border-4 border-white shadow-md absolute -top-10 left-1/2 transform -translate-x-1/2 object-cover z-30"
                    />

                    <h3 className="text-[14px] font-bold text-gray-900 mt-8">
                      {person.committee_member}
                    </h3>
                    {/* <p className="text-xs text-gray-600 mb-2">
                      {person.committee_type}
                    </p> */}
                    {/* <p className="text-xs text-gray-500">
                      {person.committee_year}
                    </p> */}
                  </div>
                );
              })}
        </div>
      </div>
    </section>
  );
};

export default MemberPerson;
