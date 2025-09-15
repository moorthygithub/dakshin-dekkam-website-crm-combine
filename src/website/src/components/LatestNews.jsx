function LatestNews() {
  return (
    <div className="container px-4 lg:px-8 mx-auto max-w-screen-xl text-gray-700">
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
        <div className="lg:w-6/12">
          <img className="w-full mb-6" src="img/laptop-news.png" />
          <span className="bg-yellow-300 text-darken font-semibold px-4 py-px text-sm rounded-full">
            FEATURED EVENT
          </span>
          <h1 className="text-gray-800 font-semibold my-3 text-xl">
            Annual Community Gathering 2025 – Celebrating Togetherness
          </h1>
          <p className="text-gray-500 mb-3">
            A wonderful evening filled with cultural programs, guest speakers,
            and community bonding activities.
          </p>
          <a href="" className="underline">
            Read more
          </a>
        </div>
        <div className="lg:w-7/12 flex flex-col justify-between mt-12 space-y-5 lg:space-y-0 lg:mt-0">
          <div className="flex space-x-5">
            <div className="w-4/12">
              <div className="relative">
                <img
                  className="rounded-xl w-full"
                  src="img/children-laptop.png"
                />
                <span className="absolute bottom-2 right-2 bg-yellow-300 text-darken font-semibold px-4 py-px text-sm rounded-full hidden sm:block">
                  WORKSHOP
                </span>
              </div>
            </div>
            <div className="w-8/12">
              <h1 className="text-gray-800 text-sm sm:text-lg font-semibold">
                Digital Literacy Workshop for Youth
              </h1>
              <p className="text-gray-500 my-2 sm:my-4 text-xs sm:text-md">
                Empowering young members with digital skills to build better
                opportunities.
              </p>
            </div>
          </div>
          <div className="flex space-x-5">
            <div className="w-4/12">
              <div className="relative">
                <img className="rounded-xl w-full" src="img/girl-laptop.png" />
                <span className="absolute bottom-2 right-2 bg-yellow-300 text-darken font-semibold px-4 py-px text-sm rounded-full hidden sm:block">
                  HEALTH CAMP
                </span>
              </div>
            </div>
            <div className="w-8/12">
              <h1 className="text-gray-800 text-sm sm:text-lg font-semibold">
                Free Community Health Check-up
              </h1>
              <p className="text-gray-500 my-2 sm:my-4 text-xs sm:text-md">
                Doctors and volunteers joined hands to provide free health
                consultations and awareness.
              </p>
            </div>
          </div>
          <div className="flex space-x-5">
            <div className="w-4/12">
              <div className="relative">
                <img className="rounded-xl w-full" src="img/cat-laptop.png" />
                <span className="absolute bottom-2 right-2 bg-yellow-300 text-darken font-semibold px-4 py-px text-sm rounded-full hidden sm:block">
                  VOLUNTEER DRIVE
                </span>
              </div>
            </div>
            <div className="w-8/12">
              <h1 className="text-gray-800 text-sm sm:text-lg font-semibold">
                Neighborhood Clean-up Campaign
              </h1>
              <p className="text-gray-500 my-2 sm:my-4 text-xs sm:text-md">
                Members united to clean public spaces and spread awareness about
                sustainable living.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LatestNews;
