function AboutUsDetails() {
  return (
    <div className="container px-4 lg:px-8 mx-auto max-w-screen-xl text-gray-700">
      <div className="sm:flex items-center sm:space-x-8">
        <div data-aos="fade-right" className="sm:w-1/2 relative">
          <div className="bg-yellow-500 rounded-full absolute w-12 h-12  -left-4 -top-3 animate-pulse"></div>
          <h1 className="font-semibold text-2xl relative  text-darken lg:pr-10">
            Everything you can do in a physical classroom,{" "}
            <span className="text-yellow-500">you can do with Skilline</span>
          </h1>
          <p className="py-5 lg:pr-32">
            Skilline's school management software helps traditional and online
            schools manage scheduling, attendance, payments and virtual
            classrooms all in one secure cloud-based system.
          </p>
          <a href="" className="underline">
            Learn More
          </a>
        </div>
        <div data-aos="fade-left" className="sm:w-1/2 relative mt-10 sm:mt-0">
          <div
            style={{ background: "#23BDEE" }}
            className="floating w-24 h-24 absolute rounded-lg z-0 -top-3 -left-3"
          ></div>
          <img
            className="rounded-xl z-40 relative"
            src="img/teacher-explaining.png"
            alt=""
          />
          <div className="bg-yellow-500 w-40 h-40 floating absolute rounded-lg z-10 -bottom-3 -right-3"></div>
        </div>
      </div>
    </div>
  );
}

export default AboutUsDetails;
