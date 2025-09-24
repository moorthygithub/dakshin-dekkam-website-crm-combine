const ProgressDots = ({ slidesCount, activeIndex, progress, onDotClick }) => {
  return (
    <ul className="flex flex-wrap justify-center gap-2 mt-4">
      {Array.from({ length: slidesCount }).map((_, idx) => (
        <li
          key={idx}
          onClick={() => onDotClick(idx)}
          className="relative flex-1 min-w-[20px] h-2 rounded-full bg-gray-200 overflow-hidden cursor-pointer max-w-[40px]"
        >
          {activeIndex === idx && (
            <div
              className="absolute top-0 left-0 h-full bg-yellow-400 rounded-full transition-all duration-100 linear"
              style={{ width: `${progress}%` }}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export default ProgressDots;
