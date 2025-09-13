
const GalleryCard = ({ bigImage, smallImages }) => {
  return (
    <div className="max-w-6xl mx-auto bg-transparent p-6 rounded-xl overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div data-aos="fade-right">
          <img
            src={bigImage}
            alt="Big Gallery"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <div
          className="grid grid-cols-2 gap-4"
          data-aos="fade-left"
          data-aos-delay="200"
        >
          {smallImages.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`Small ${idx + 1}`}
              data-aos="zoom-in"
              data-aos-delay={idx * 150}
              data-aos-easing="ease-in-out"
              className="w-full h-40 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryCard;
