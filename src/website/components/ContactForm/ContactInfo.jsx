import { Mail, MapPin } from "lucide-react";
import LazyMap from "./LazyMap";

const ContactInfo = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            className="flex items-start gap-5 bg-white shadow-md p-6 rounded-2xl hover:shadow-lg transition"
            data-aos="zoom-in"
          >
            <div className="flex-shrink-0 w-16 h-16 bg-yellow-100 flex items-center justify-center rounded-full">
              <Mail size={28} className="text-yellow-600" />
            </div>
            <div>
              <h3 className="text-midnight_text text-lg font-semibold">
                Email Us
              </h3>
              <p className="text-black/60 text-base mt-2">
                Feel free to contact us at{" "}
                <span className="font-medium text-yellow-600">
                  info@testgmail.com
                </span>{" "}
                — we’ll respond promptly.
              </p>
            </div>
          </div>

          <div
            className="flex items-start gap-5 bg-white shadow-md p-6 rounded-2xl hover:shadow-lg transition"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <div className="flex-shrink-0 w-16 h-16 bg-yellow-100 flex items-center justify-center rounded-full">
              <MapPin size={28} className="text-yellow-600" />
            </div>
            <div>
              <h3 className="text-midnight_text text-lg font-semibold">
                Address
              </h3>
              <p className="text-black/60 text-base mt-2">
                221b Baker St, London NW1 6XE, United Kingdom
              </p>
            </div>
          </div>
        </div>

        {/* <div className="pt-12" data-aos="fade-up" data-aos-delay="200">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2707.738549187617!2d77.5923704!3d12.9207136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae150995555555%3A0x440eaf1d21e4db01!2sAG%20Solutions!5e1!3m2!1sen!2sin!4v1756893439051!5m2!1sen!2sin"
            width="1114"
            height="477"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-xl w-full shadow-md"
          ></iframe>
        </div> */}
   
      </div>
      {/* <div className="border-b border-solid border-border mt-12"></div> */}
    </section>
  );
};

export default ContactInfo;
