import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Custom easing function: easeInOutCubic
  const easeInOutCubic = (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const scrollToTop = () => {
    const start = window.scrollY;
    const duration = 600; // total animation time (ms)
    let startTime = null;

    const animateScroll = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const ease = easeInOutCubic(progress);
      window.scrollTo(0, start * (1 - ease));

      if (elapsed < duration) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-20 md:bottom-8 right-8 z-20">
      <div className="flex items-center gap-2.5">
        {isVisible && (
          <div
            onClick={scrollToTop}
            aria-label="scroll to top"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-yellow-100 text-black shadow-md transition duration-300 ease-in-out hover:scale-110"
          >
            <ArrowUp className="h-5 w-5" />
          </div>
        )}
      </div>
    </div>
  );
}
