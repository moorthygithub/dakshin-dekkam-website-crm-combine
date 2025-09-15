import { useEffect, useRef, useState } from "react";

function LazyMap() {
  const [isVisible, setIsVisible] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (mapRef.current) {
      observer.observe(mapRef.current);
    }

    return () => {
      if (mapRef.current) observer.unobserve(mapRef.current);
    };
  }, []);

  return (
    <section className="pb-12">
      <div className="container mx-auto px-4">
        <div
          ref={mapRef}
          className="min-h-[400px]"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {isVisible ? (
            <>
              {!mapLoaded && (
                <div className="absolute inset-0 rounded-xl w-full h-[400px] bg-gray-200 shadow-md animate-pulse"></div>
              )}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2707.738549187617!2d77.5923704!3d12.9207136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae150995555555%3A0x440eaf1d21e4db01!2sAG%20Solutions!5e1!3m2!1sen!2sin!4v1756893439051!5m2!1sen!2sin"
                width="1114"
                height="477"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-xl w-full shadow-md relative z-10"
                onLoad={() => setMapLoaded(true)}
              ></iframe>
            </>
          ) : (
            <div className="rounded-xl w-full h-[400px] bg-gray-200 shadow-md animate-pulse"></div>
          )}
        </div>
      </div>
    </section>
  );
}

export default LazyMap;
