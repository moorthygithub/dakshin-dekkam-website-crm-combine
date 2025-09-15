import { useState, useEffect } from "react";
import InputField from "../common/InputField";
import SelectField from "../common/SelectField";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    projectname: "",
    email: "",
    Project: "",
    Message: "",
  });
  const [errors, setErrors] = useState({});
  const [showThanks, setShowThanks] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isValid = Object.values(formData).every((val) => val.trim() !== "");
    setIsFormValid(isValid);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.projectname.trim())
      newErrors.projectname = "Project Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.Project.trim())
      newErrors.Project = "Project type is required";
    if (!formData.Message.trim()) newErrors.Message = "Message is required";
    return newErrors;
  };

  const reset = () => {
    setFormData({
      name: "",
      projectname: "",
      email: "",
      Project: "",
      Message: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setLoader(true);
    try {
      // Simulate API call
      const data = true;
      if (data) {
        setShowThanks(true);
        reset();
        setTimeout(() => setShowThanks(false), 5000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoader(false);
    }
  };

  const projectOptions = [
    "EdTech App",
    "eCommerce Apps",
    "CRM Apps",
    "Health Apps",
    "Web Analytics Apps",
    "Banking Apps",
  ];

  return (
    <section className=" pb-24 !pt-0">
      <div className="container mx-auto  px-4">
        <div className="grid md:grid-cols-12 grid-cols-1 gap-8">
          <div className="col-span-6 md:pt-12 pt-0 relative">
            <div
              data-aos="flip-up"
              className="max-w-xl mx-auto text-center my-6"
            >
              <h1 className="font-bold text-darken my-3 text-2xl">
                Contact <span className="text-yellow-500">Form.</span>
              </h1>
              <p className="leading-relaxed text-gray-500">
                contaus for more information .
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-wrap  w-full m-auto justify-between"
              data-aos="fade-right"
              data-aos-delay="500"
            >
              <div className="sm:flex gap-3 w-full">
                <InputField
                  label="User Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                />
                <InputField
                  label="Project Name"
                  name="projectname"
                  value={formData.projectname}
                  onChange={handleChange}
                  error={errors.projectname}
                />
              </div>
              <div className="sm:flex gap-3 w-full">
                <InputField
                  label="Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                />
                <SelectField
                  label="Project Type"
                  name="Project"
                  value={formData.Project}
                  onChange={handleChange}
                  options={projectOptions}
                  error={errors.Project}
                />
              </div>
              <div className="w-full">
                <InputField
                  label="Message"
                  name="Message"
                  value={formData.Message}
                  onChange={handleChange}
                  type="textarea"
                  error={errors.Message}
                />
              </div>
              <div className="mx-0 my-2.5 w-full flex justify-center">
                <button
                  type="submit"
                  disabled={!isFormValid || loader}
                  className={`border leading-none px-6 text-lg font-medium py-4 rounded-lg 
                    ${
                      !isFormValid || loader
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-yellow-100 text-black  cursor-pointer"
                    }`}
                >
                  Submit
                </button>
              </div>
            </form>
            {showThanks && (
              <div className="text-white bg-green-400 rounded-full px-4 text-lg mb-4.5 mt-2 absolute flex items-center gap-2">
                Request submitted successfully. Thank you.
                <div className="w-3 h-3 rounded-full animate-spin border-2 border-solid border-white border-t-transparent"></div>
              </div>
            )}
          </div>
          <div className="col-span-6" data-aos="fade-up" data-aos-delay="700">
            <img
              src="/img/contact.webp"
              alt="Contact"
  style={{ borderRadius: "0.5rem", width: "100%", maxHeight: "600px" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
