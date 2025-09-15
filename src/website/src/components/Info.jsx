import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import SingleTestimonial from "./SingleTestimonial";
import { TestimonialData } from "../data/testimonial";
import InputField from "./common/InputField";

const Info = () => {
  const [formData, setFormData] = useState({
    Fname: "",
    Phone: "",
    Mail: "",
    Message: "",
  });

  const [showThanks, setShowThanks] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isValid = Object.values(formData).every(
      (value) => value.trim() !== ""
    );
    setIsFormValid(isValid);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const reset = () => {
    setFormData({
      Fname: "",
      Phone: "",
      Mail: "",
      Message: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
      setShowThanks(true);
      reset();
      setTimeout(() => setShowThanks(false), 5000);
    }, 1000);
  };

  const settings = {
    autoplay: true,
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <section className="relative bg-cream py-16">
      <div className="container mx-auto max-w-screen-xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 text-black" data-aos="fade-right ">
            <div className="flex relative mb-6">
              <div className="bg-yellow-500 rounded-full absolute w-12 h-12 z-0 -left-4 -top-3 animate-pulse"></div>
              <h1 className="font-semibold text-2xl relative z-50 text-darken lg:pr-10">
                Join us Now
              </h1>
            </div>

            <h1 className="text-darken font-semibold text-3xl">
              <span className="text-yellow-500">Ready</span> to try the app for
              free?
            </h1>

            <Slider {...settings}>
              {TestimonialData.map((item, index) => (
                <SingleTestimonial
                  key={index}
                  review={item.review}
                  image={item.Image}
                  name={item.name}
                  post={item.post}
                />
              ))}
            </Slider>
          </div>

          <div className="lg:col-span-7">
            <div data-aos="fade-down" className=" relative">
              <div
                style={{ background: "#33EFA0" }}
                className="w-32 h-32 rounded-full absolute z-0 left-4 -top-12 animate-pulse"
              ></div>
              <div
                style={{ background: "#33D9EF" }}
                className="w-5 h-5 rounded-full absolute z-0 left-36 -top-12 animate-ping"
              ></div>

              <form
                onSubmit={handleSubmit}
                className=" bg-white p-6 rounded-xl shadow-lg relative z-20 floating w-full"
              >
                <div className="grid grid-cols-2 gap-6">
                  <InputField
                    label="Full Name"
                    name="Fname"
                    value={formData.Fname}
                    onChange={handleChange}
                    placeholder="Enter your name"
                  />

                  <InputField
                    label="Phone No."
                    name="Phone"
                    type="number"
                    value={formData.Phone}
                    onChange={handleChange}
                    placeholder="Enter your Phone No."
                  />
                </div>
                <InputField
                  label="Email"
                  name="Mail"
                  type="email"
                  value={formData.Mail}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="col-span-2"
                />

                <InputField
                  label="Message"
                  name="Message"
                  type="textarea"
                  value={formData.Message}
                  onChange={handleChange}
                  placeholder="Anything else you want to communicate"
                  rows={4}
                  className="col-span-2"
                />

                <div className="col-span-2 flex items-center gap-2 mb-6">
                  <input type="checkbox" required id="condition" />
                  <label htmlFor="condition" className="text-sm">
                    You agree to our{" "}
                    <Link to="#" className="text-orange-600 underline">
                      terms and conditions
                    </Link>
                  </label>
                </div>

                <div className="col-span-2">
                  <button
                    type="submit"
                    disabled={!isFormValid || loader}
                    className={`w-full py-3 rounded-lg font-medium transition 
      ${
        !isFormValid || loader
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-yellow-500 text-white hover:bg-orange-700"
      }`}
                  >
                    {loader ? "Submitting..." : "Try For Free"}
                  </button>
                </div>
              </form>

              <div
                style={{ background: "#5B61EB" }}
                className="w-36 h-36 rounded-full absolute z-0 right-16 -bottom-12 animate-pulse"
              ></div>
              <div
                style={{ background: "#F56666" }}
                className="w-5 h-5 rounded-full absolute z-0 right-48 -bottom-18 animate-ping"
              ></div>
            </div>

            {showThanks && (
              <div className="mt-4 text-white bg-green-500 rounded-lg px-6 py-3 flex items-center gap-3 shadow-md">
                ✅ Your free trial has started.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Info;
