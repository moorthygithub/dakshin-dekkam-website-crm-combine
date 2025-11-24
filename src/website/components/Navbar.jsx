import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MobileBottomNav from "./MobileBottomNav";
import { Home, Info, Image, Users, User, Phone, House, HousePlus, IndianRupee } from "lucide-react";
import DesktopNavbar from "./DesktopNavbar";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const menuItems = [
    {
      label: "Home",
      path: "/",
      icon: <Home className="h-5 w-5" />,
      onClick: () => setOpen(false),
    },
    {
      label: "About",
      path: "/aboutus",
      icon: <Info className="h-5 w-5" />,
      onClick: () => setOpen(false),
    },

    {
      label: "Community",
      path: "/community",
      icon: <Users className="h-5 w-5" />,
      onClick: () => setOpen(false),
    },
    {
      label: "Member Area",
      path: "/member",
      icon: <User className="h-5 w-5" />,
      onClick: () => setOpen(false),
    },
    {
      label: "Bhavan Form",
      path: "/bhavan-rorm",
      icon: <User className="h-5 w-5" />,
      onClick: () => setOpen(false),
    },
    {
      label: "Gallery",
      path: "/gallery",
      icon: <Image className="h-5 w-5" />,
      onClick: () => setOpen(false),
    },
    {
      label: "Contact",
      path: "/contact",
      icon: <Phone className="h-5 w-5" />,
      onClick: () => setOpen(false),
    },
   
    
  ];
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isLargeScreen = window.innerWidth >= 768;

      setIsScrolled(currentScrollY > 40);

      if (isLargeScreen) {
        if (currentScrollY < 40) setShowNavbar(true);
        else if (currentScrollY > lastScrollY && currentScrollY < 500)
          setShowNavbar(false);
        else setShowNavbar(true);
      } else {
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div>
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 py-3 ${
          showNavbar
            ? isScrolled
              ? "bg-yellow-100 shadow-md !text-black"
              : "bg-transparent"
            : "-translate-y-full"
        } ${isHome ? "text-white" : "text-black"}`}
      >
        <div className="max-w-screen-xl mx-auto px-6 md:px-8 flex items-center justify-between">
          <div className="relative">
            <Link
              to="/"
              className="text-lg relative z-50 font-bold tracking-widest rounded-lg focus:outline-none focus:shadow-outline"
            >
              Dhakshin Ekkam
            </Link>
            <svg
              className="h-11 z-40 absolute -top-2 -left-3"
              viewBox="0 0 79 79"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M35.2574 2.24264C37.6005 -0.100501 41.3995 -0.100505 43.7426 2.24264L76.7574 35.2574C79.1005 37.6005 79.1005 41.3995 76.7574 43.7426L43.7426 76.7574C41.3995 79.1005 37.6005 79.1005 35.2574 76.7574L2.24264 43.7426C-0.100501 41.3995 -0.100505 37.6005 2.24264 35.2574L35.2574 2.24264Z"
                fill="#65DAFF"
              />
            </svg>
          </div>
          <DesktopNavbar menuItems={menuItems} />
        </div>
      </div>

      <MobileBottomNav open={open} menuItems={menuItems} setOpen={setOpen} />
    </div>
  );
}

export default Navbar;
