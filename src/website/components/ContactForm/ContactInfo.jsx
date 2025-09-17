import { Mail, MapPin } from "lucide-react";

const ContactInfo = ({ websitecompany }) => {
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
                <a
                  href={`mailto:${websitecompany?.support_email || ""}`}
                  className="font-medium text-yellow-600 hover:underline"
                >
                  {websitecompany?.support_email || ""}
                </a>{" "}
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
                {websitecompany?.store_address || ""}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
