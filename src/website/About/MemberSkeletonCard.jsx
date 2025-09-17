const MemberSkeletonCard = () => {
  return (
    <div className="bg-yellow-100 rounded-xl shadow-lg p-6 pt-10 text-center flex flex-col items-center relative animate-pulse mt-14 md:mt-0">
      {/* Image skeleton */}
      <div className="w-24 h-24 rounded-full border-4 border-white shadow-md absolute -top-14 left-1/2 transform -translate-x-1/2 bg-gray-300"></div>

      {/* Name skeleton */}
      <div className="h-4 w-32 bg-gray-300 rounded mt-10 mb-2"></div>

      {/* Role skeleton */}
      <div className="h-3 w-20 bg-gray-300 rounded mb-2"></div>
      <div className="h-2 w-20 bg-gray-300 rounded mb-2"></div>
    </div>
  );
};

export default MemberSkeletonCard;
