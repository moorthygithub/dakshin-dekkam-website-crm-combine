import { GET_UPCOMING_EVENTS } from "@/api";
import { useGetApiMutation } from "@/hooks/useGetApiMutation";
import { useState } from "react";

function LatestNews() {
  const [expanded, setExpanded] = useState(false);

  const { data: upcomingevent, isLoading } = useGetApiMutation({
    url: GET_UPCOMING_EVENTS,
    queryKey: ["getupcoming event"],
  });

  const baseImageUrl =
    upcomingevent?.image_url?.find((img) => img.image_for === "Event")
      ?.image_url || "";

  const events = upcomingevent?.data || [];
  const featured = events.length > 0 ? events[0] : null;
  const others = events.length > 1 ? events.slice(1) : [];

  const truncateText = (text, length) => {
    if (!text) return "";
    return text.length <= length ? text : text.slice(0, length) + "...";
  };

  if (!featured) {
    return <p className="text-center my-10">No events found</p>;
  }

  return (
    <div className="container px-4 lg:px-8 mx-auto max-w-screen-xl text-gray-700 ">
      <div data-aos="zoom-in" className="mt-16 text-center">
        <h1 className="text-darken text-2xl font-semibold">
          Latest Community Events
        </h1>
        <p className="text-gray-500 my-5">
          Stay updated with the recent activities and gatherings from our
          community
        </p>
      </div>

      <div
        data-aos="zoom-in-up"
        className="my-14 flex flex-col lg:flex-row lg:space-x-20"
      >
        {/* Featured Event */}
        <div className="lg:w-6/12">
          <img
            className="w-full mb-6 rounded-xl shadow-md"
            src={`${baseImageUrl}${featured.event_image || ""}`}
            alt={featured.event_name || "Event"}
          />
          <span className="bg-yellow-300 text-darken font-semibold px-4 py-px text-sm rounded-full">
            FEATURED EVENT
          </span>
          <h1 className="text-gray-800 font-semibold my-3 text-xl">
            {featured.event_name || ""}
          </h1>
          <p className="text-gray-500 mb-3 transition-all duration-500 ease-in-out overflow-hidden max-h-24">
            {expanded
              ? featured.event_description
              : truncateText(featured.event_description, 100)}
          </p>
          {featured.event_description &&
            featured.event_description.length > 100 && (
              <button
                className="text-yellow-500 underline mt-1 block"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? "Show less" : "Read more"}
              </button>
            )}
        </div>

        {/* Other Events */}
        <div className="lg:w-7/12 flex flex-col mt-12 gap-y-5 lg:mt-0 max-h-[38rem] overflow-y-auto scrollbar-hide cursor-grabbing">
          {others.map((event) => (
            <div key={event.id} className="flex space-x-5">
              <div className="w-5/12">
                <img
                  className="rounded-xl w-full shadow-md"
                  src={`${baseImageUrl}${event.event_image || ""}`}
                  alt={event.event_name || "Event"}
                />
              </div>
              <div className="w-8/12">
                <h1 className="text-gray-800 text-sm sm:text-lg font-semibold">
                  {event.event_name || ""}
                </h1>
                <p className="text-gray-500 my-2 sm:my-4 text-xs sm:text-md overflow-y-auto">
                  {event.event_description || ""}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LatestNews;
