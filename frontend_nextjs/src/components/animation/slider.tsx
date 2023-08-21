import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 2000 : -2000,
      y: 0,
      opacity: 0,
      translateY: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    y: 0,
    translateY: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 2000 : -2000,
      y: 0,
      opacity: 0,
      translateY: 0,
    };
  },
};
const SlideAnimation = ({
  children,
  className,
  direction,
  currentPage,
}: {
  children: any;
  className: string;
  direction: number;
  currentPage: number;
}) => {
  return (
    <AnimatePresence initial={false} custom={direction} mode="popLayout">
      <motion.div
        key={currentPage}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          x: { type: 'spring', stiffness: 300, damping: 30 },
          opacity: { duration: 0.3 },
          translateY: { duration: 0.3 },
        }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default SlideAnimation;
