import { Mail, MapPin } from "lucide-react";

const ContactInfo = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            className="flex items-start gap-5 bg-white shadow-md p-6 rounded-2xl hover:shadow-lg transition"
            data-aos="zoom-in"
          >
            {/* 101, Tara Apartments, 132, Infantry Road, Bangalore – 560001 |
            e-mail: kdo.bangalore@gmail.com For Correspondence: */}
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
                  href="mailto:dbkdoekkam@gmail.com"
                  className="font-medium text-yellow-600 hover:underline"
                >
                  dbkdoekkam@gmail.com
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
                Kutchi Bhavan, # 44B, 1st Main Road, J P Nagar 3rd Phase,
                Bangalore - 560078
              </p>
            </div>
          </div>
        </div>

  
      </div>
    </section>
  );
};

export default ContactInfo;
