import { Link } from "react-router-dom";

function OurHistory() {
  return (
    <div className="container px-4 lg:px-8 mx-auto max-w-screen-xl text-gray-700">
      <div className="sm:flex items-center sm:space-x-8">
        {/* Text Section */}
        <div data-aos="fade-right" className="sm:w-1/2 relative">
          <div className="bg-yellow-500 rounded-full absolute w-12 h-12 -left-4 -top-3 animate-pulse"></div>
          <h1 className="font-semibold text-2xl relative text-darken lg:pr-10">
            Our Journey Through Time:{" "}
            <span className="text-yellow-500">Shaping Excellence</span>
          </h1>
          <p className="py-5 lg:pr-32 text-gray-600">
            Since our inception, we have been committed to empowering
            communities with innovative solutions and meaningful connections.
            Our milestones reflect growth, innovation, and dedication to
            excellence.
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>
              <strong>2010:</strong> Founded with a vision to connect learners
              globally.
            </li>
            <li>
              <strong>2015:</strong> Launched our first cloud-based platform.
            </li>
            <li>
              <strong>2020:</strong> Expanded into multiple countries and
              introduced AI-driven tools.
            </li>
          </ul>
          <Link className="underline mt-5 inline-block text-yellow-500">
            Learn More
          </Link>
        </div>

        {/* Image / Illustration Section */}
        <div data-aos="zoom-in" className="sm:w-1/2 relative mt-10 sm:mt-0">
          <div
            style={{ background: "#23BDEE" }}
            className="floating w-24 h-24 absolute rounded-lg z-0 -top-3 -left-3"
          ></div>
          <img
            className="rounded-xl z-40 relative shadow-lg"
            src="img/teacher-explaining.png"
            alt="Our History Illustration"
          />
          <div className="bg-yellow-500 w-40 h-40 floating absolute rounded-lg z-10 -bottom-3 -right-3"></div>
        </div>
      </div>
    </div>
  );
}

export default OurHistory;
