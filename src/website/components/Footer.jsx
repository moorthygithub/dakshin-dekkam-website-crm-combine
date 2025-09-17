import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

function Footer() {
  return (
    <footer className="bg-[#252641] text-white pt-12">
      <div className="container mx-auto px-4 lg:px-16 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1: Logo & Description */}
        <div>
          <h1 className="text-2xl font-bold mb-3 relative inline-block">
            <span className="z-10"> Dhakshin Ekkam</span>
            <svg
              className="w-6 h-6 absolute -top-0 -left-3 z-20"
              viewBox="0 0 79 79"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M35.9645 2.94975C37.9171 0.997129 41.0829 0.997127 43.0355 2.94975L76.0502 35.9645C78.0029 37.9171 78.0029 41.0829 76.0503 43.0355L43.0355 76.0502C41.0829 78.0029 37.9171 78.0029 35.9645 76.0503L2.94975 43.0355C0.997129 41.0829 0.997127 37.9171 2.94975 35.9645L35.9645 2.94975Z"
                stroke="#26C1F2"
                strokeWidth="2"
              />
            </svg>
          </h1>
          <p className="text-gray-400 mt-3">
            We help build a stronger community with resources, support, and
            guidance to empower members.
          </p>
          <div className="flex space-x-3 mt-4">
            <Link to="#" className="hover:text-yellow-500">
              <Facebook size={18} />
            </Link>
            <Link to="#" className="hover:text-yellow-500">
              <Twitter size={18} />
            </Link>
            <Link to="#" className="hover:text-yellow-500">
              <Instagram size={18} />
            </Link>
            <Link to="#" className="hover:text-yellow-500">
              <Linkedin size={18} />
            </Link>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h2 className="font-semibold text-lg mb-4">Quick Links</h2>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link to="/" className="hover:text-yellow-500">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-yellow-500">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/events" className="hover:text-yellow-500">
                Events
              </Link>
            </li>
            <li>
              <Link to="/community" className="hover:text-yellow-500">
                Community
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-yellow-500">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Map */}
        <div>
          <h2 className="font-semibold text-lg mb-4">Our Location</h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d507.2010896665353!2d77.5983429677261!3d12.911707600000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae150c8e8367cf%3A0x51965e263a2f0b9e!2sMTR!5e1!3m2!1sen!2sin!4v1758102368828!5m2!1sen!2sin"
            width="100%"
            height="150"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="map"
          ></iframe>
        </div>

        {/* Column 4: Contact Info */}
        <div>
          <h2 className="font-semibold text-lg mb-4">Contact Us</h2>
          <p className="flex items-center gap-2 text-gray-400 mb-2">
            <MapPin size={16} /> Kutchi Bhavan, #44B, 1st Main Road, JP Nagar
            3rd Phase, Bangalore - 560078
          </p>
          <p className="flex items-center gap-2 text-gray-400 mb-2">
            <Phone size={16} />{" "}
            <Link to="tel:26586798" className="hover:text-yellow-500">
              2658 6798
            </Link>
          </p>
          <p className="flex items-center gap-2 text-gray-400">
            <Mail size={16} />{" "}
            <Link
              to="mailto:dbkdoekkam@gmail.com"
              className="hover:text-yellow-500"
            >
              dbkdoekkam@gmail.com
            </Link>
          </p>
        </div>
      </div>

      {/* Subscription */}
      <div className="text-center mt-12 px-4">
        <label className="text-gray-300 font-semibold mb-2 block">
          Subscribe to our newsletter
        </label>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-2">
          <input
            type="email"
            placeholder="Your Email"
            className="rounded-full py-2 pl-5 bg-transparent border border-gray-400 text-white placeholder-gray-400"
          />
          <button
            type="submit"
            className="text-white font-semibold px-5 py-2 rounded-full bg-gradient-to-r from-[#545AE7] to-[#393FCF]"
          >
            Subscribe
          </button>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-400 mt-12 pb-6">
        &copy; 2025 AG Solutions. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
