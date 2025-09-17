import { Link } from "react-router-dom";

const ContactLocation = () => {
  return (
    <>
      <section className="bg-cream py-24">
        <div className="container mx-auto  px-4">
          <div
            className="grid sm:grid-cols-3 grid-cols-1 sm:gap-24 gap-4 border-b border-solid  pb-11"
            data-aos="flip-up"
            data-aos-delay="200"
          >
            <div>
              <h2 className="text-3xl leading-tight font-bold">
                Pune Head Office
              </h2>
            </div>
            <div>
              <p className="text-lg font-normal leading-10">
                4292 Mapleview Drive Greenfield Zip code 38230
              </p>
            </div>
            <div>
              <Link
                to="mailto:main@orinal.com"
                className="text-lg  font-medium underline "
              >
                mailto:main@orinal.com
              </Link>
              <Link
                to="tel:731-621-5503"
                className="text-lg  flex items-center gap-2  w-fit"
              >
                <span>Call :</span>731-621-5503
              </Link>
            </div>
          </div>
          <div
            className="grid sm:grid-cols-3 grid-cols-1 sm:gap-24 gap-4 pt-12"
            data-aos="flip-down"
            data-aos-delay="200"
          >
            <div>
              <h2 className="text-3xl leading-tight font-bold">
                Bengaluru Office
              </h2>
            </div>
            <div>
              <p className="text-lg  font-normal leading-10">
                Kutchi Bhavan, # 44B, 1st Main Road, J P Nagar 3rd Phase,
                Bangalore - 560078
              </p>
            </div>
            <div>
              <Link
                to="mailto:dbkdoekkam@gmail.com"
                className="text-lg  font-medium underline"
              >
                mailto:dbkdoekkam@gmail.com
              </Link>
              <Link
                to="tel:26586798"
                className="text-lg  flex items-center gap-2 hover:text-opacity-100 w-fit"
              >
                <span>Tel :</span>2658 6798
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactLocation;
