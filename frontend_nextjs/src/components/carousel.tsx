/* eslint-disable prettier/prettier */
import type { ReactNode, ReactNode} from "react";
import { useEffect, useRef, useState } from "react";


interface CarouselProps {
  children?: ReactNode;
  autoSlide?: boolean;
  slideInterval?: number;
}

const Carousel: React.FC<CarouselProps> = ({ children, autoSlide = true, slideInterval = 3000, }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentPosition, setCurrentPosition] = useState(0);

  useEffect(() => {
    if (autoSlide) {
      const interval = setInterval(slideRight, slideInterval);
      return () => clearInterval(interval);
    }
  }, [autoSlide, slideInterval]);

  function slideRight() {
    if (carouselRef.current) {
      const slideWidth = carouselRef.current.querySelector(".carousel-slide")?.offsetWidth || 0;
      setCurrentPosition((prevPosition) => (prevPosition + slideWidth) % (slideWidth * (carouselRef.current?.children.length || 1)));
    }
  }

  function slideLeft() {
    if (carouselRef.current) {
      const slideWidth = carouselRef.current.querySelector(".carousel-slide")?.offsetWidth || 0;
      setCurrentPosition((prevPosition) => {
        let newPosition = prevPosition - slideWidth;
        if (newPosition < 0) {
          newPosition = slideWidth * ((carouselRef.current?.children.length || 1) - 1);
        }
        return newPosition;
      });
    }
  }

  return (
    <div className="carousel-container relative overflow-hidden">
      <div ref={carouselRef} className="carousel flex transition-transform ease-linear" style={{ transform: `translateX(-${currentPosition}px)` }}>
        {children}
      </div>
    </div>
  );
};

export default Carousel;
