import { Link } from "react-router-dom";

function OurHistory() {
  return (
    <div className="container px-4 lg:px-8 mx-auto max-w-screen-xl text-gray-700">
      <div className="sm:flex items-center sm:space-x-8">
        {/* Text Section */}
        <div data-aos="fade-right" className="sm:w-1/2 relative">
  <div className="bg-yellow-500 rounded-full absolute w-12 h-12 -left-4 -top-3 animate-pulse"></div>

  <h1 className="font-semibold text-2xl relative text-darken lg:pr-10">
    Our Vision & Journey:{" "}
    <span className="text-yellow-500">Serving Humanity Through Unity</span>
  </h1>

  <p className="py-5 text-gray-600">
    The <strong>Dakshin Bharat Kutchi Dasha Oswal Jain Ekkam</strong> envisions a vibrant,
    inclusive society rooted in compassion, knowledge, and unity. Anchored in the
    spiritual and cultural heritage of the Jain community, Ekkam strives to be a beacon
    of service and progress across Southern India — spanning Karnataka, Andhra Pradesh,
    Tamil Nadu, Kerala, Pondicherry, and Goa.
  </p>

  <p className="py-3 text-gray-600">
    Established with its registered office in <strong>Hubli</strong>, Ekkam is guided by a
    mission to uplift humanity through the practical application of literature, art,
    science, and philanthropy. It fosters fraternity and harmony by transcending barriers
    of caste, creed, religion, and language.
  </p>

  <ul className="list-disc list-inside text-gray-600 space-y-2">
    <li>
      <strong>Compassion & Service:</strong> Supporting medical aid, hospitals, and
      dharamshalas to relieve suffering.
    </li>
    <li>
      <strong>Education & Knowledge:</strong> Promoting learning through institutions,
      libraries, and hostels open to all communities.
    </li>
    <li>
      <strong>Non-Violence & Welfare:</strong> Championing animal protection and
      panjarpole initiatives.
    </li>
    <li>
      <strong>Unity & Responsibility:</strong> Encouraging members to act with moral
      integrity, compassion, and social awareness.
    </li>
    <li>
      <strong>Progress & Innovation:</strong> Advancing science, health, and technology
      through research and outreach without profit motives.
    </li>
  </ul>

  <p className="py-5 text-gray-600">
    Ekkam’s journey is one of hearts and minds—dedicated to building a peaceful,
    enlightened, and compassionate society. Its mission continues to inspire harmony,
    brotherhood, and purposeful living across generations.
  </p>


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
