const ChairPersonSkeletonCard = () => {
  return (
    <div className="relative rounded-xl shadow-lg overflow-hidden h-56 animate-pulse">
      {/* Background skeleton */}
      <div className="absolute inset-0 bg-gray-300"></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      {/* Text placeholders */}
      <div className="relative z-10 p-6 text-center flex flex-col items-center justify-end h-full">
        <div className="h-4 w-28 bg-gray-400 rounded mb-2"></div>
        <div className="h-3 w-20 bg-gray-400 rounded mb-2"></div>
        <div className="h-3 w-16 bg-gray-400 rounded"></div>
      </div>
    </div>
  );
};

export default ChairPersonSkeletonCard;
