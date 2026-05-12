// src/components/Carousel.tsx

import React, { useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface CarouselProps {
  children: React.ReactNode[];
  cardWidth?: number;
}

const Carousel: React.FC<CarouselProps> = ({
  children,
  cardWidth = 280,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // duplicate for infinite illusion
  const duplicated = [
    ...children,
    ...children,
    ...children,
  ];

  useEffect(() => {
    const container = scrollRef.current;

    if (!container) return;

    // start in middle set
    container.scrollLeft =
      container.scrollWidth / 3;
  }, []);

  const handleScroll = (
    direction: "left" | "right"
  ) => {
    const container = scrollRef.current;

    if (!container) return;

    const amount =
      direction === "left"
        ? -cardWidth - 24
        : cardWidth + 24;

    container.scrollBy({
      left: amount,
      behavior: "smooth",
    });

    // invisible reset
    setTimeout(() => {
      const third =
        container.scrollWidth / 3;

      if (container.scrollLeft <= third * 0.5) {
        container.scrollLeft += third;
      }

      if (container.scrollLeft >= third * 1.5) {
        container.scrollLeft -= third;
      }
    }, 450);
  };

  return (
    <div className="relative w-full py-8">

      {/* LEFT BUTTON */}
      <button
        onClick={() => handleScroll("left")}
        className="
          absolute
          left-2
          top-1/2
          -translate-y-1/2
          z-20
          h-12
          w-12
          rounded-full
          bg-black/40
          backdrop-blur-md
          text-white
          flex
          items-center
          justify-center
          hover:scale-110
          transition-all
          duration-300
        "
      >
        <FaChevronLeft size={16} />
      </button>

      {/* RIGHT BUTTON */}
      <button
        onClick={() => handleScroll("right")}
        className="
          absolute
          right-2
          top-1/2
          -translate-y-1/2
          z-20
          h-12
          w-12
          rounded-full
          bg-black/40
          backdrop-blur-md
          text-white
          flex
          items-center
          justify-center
          hover:scale-110
          transition-all
          duration-300
        "
      >
        <FaChevronRight size={16} />
      </button>

      {/* TRACK */}
      <div
        ref={scrollRef}
        className="
          flex
          gap-6
          overflow-x-scroll
          scroll-smooth
          no-scrollbar
          px-20
        "
      >
        {duplicated.map((child, index) => (
          <div
            key={index}
            style={{
              minWidth: `${cardWidth}px`,
              maxWidth: `${cardWidth}px`,
            }}
            className="
            shrink-0
                transition-all
    duration-300
    hover:scale-[1.05]
    "
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;