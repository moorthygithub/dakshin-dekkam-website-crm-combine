const TeamSkeletonCard = ({ idx }) => (
  <div key={idx} className="px-2" data-aos="fade-up" data-aos-delay={idx * 150}>
    <div className="bg-gray-100 rounded-xl shadow-lg p-6 flex flex-col items-center animate-pulse my-2">
      <div className="w-20 h-20 mb-4 rounded-full bg-gray-300 border-4 border-gray-200 shadow-md" />

      <div className="h-4 w-28 bg-gray-300 rounded mb-3"></div>

      <div className="h-3 w-20 bg-gray-200 rounded mb-2"></div>

      <div className="h-3 w-16 bg-gray-200 rounded"></div>

      <div className="mt-4 w-10 h-1 bg-gray-200 rounded-full"></div>
    </div>
  </div>
);
export default TeamSkeletonCard;
