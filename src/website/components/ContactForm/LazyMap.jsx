import { useEffect, useRef, useState } from "react";

function LazyMap({ websitecompany }) {
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
                title="Kutchi Bhavan"
                src={websitecompany.google_map_url || ""}
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
