import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { convertSecondsToMinutesAndSeconds } from '@/utils';

const Countdown = ({
  seconds,
  onCountdownComplete,
  isPaused,
  onPause,
}: {
  seconds: number;
  onCountdownComplete: () => void;
  isPaused: boolean;
  onPause: any;
}) => {
  const [timeSpent, setTimeSpent] = useState(0);
  useEffect(() => {
    let interval;

    if (!isPaused) {
      interval = setInterval(() => {
        setTimeSpent((prevTimeSpent) => prevTimeSpent + 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isPaused, setTimeSpent]);
  const variants = {
    hidden: {
      backgroundColor: 'transparent',
      width: '100%',
      height: '100%',
      scaleX: 0,
    },
    visible: {
      backgroundColor: '#745696',
      width: '100%',
      height: '100%',
      scaleX: 1,
    },
    paused: {
      backgroundColor: '#745696',
      width: '100%',
      height: '100%',
      scaleX: timeSpent / seconds,
      // scaleX: 1,
    },
  };

  const handleAnimationEnd = () => {
    onCountdownComplete(); // Call the provided callback when animation completes
    onPause(true);
  };
  return (
    <div className="flex justify-center">
      <div
        className="w-[calc(100vw-15rem)] h-[1em] rounded-lg bg-[#393241] relative"
        id="progressing-container"
      >
        <span className="text-sm text-gray-300 absolute left-1/2 -translate-x-1/2 z-50">
          {convertSecondsToMinutesAndSeconds(timeSpent)} /{' '}
          {convertSecondsToMinutesAndSeconds(seconds)}
        </span>
        <motion.div
          variants={variants}
          initial="hidden"
          animate={isPaused ? 'paused' : 'visible'}
          transition={{ duration: isPaused ? -1000 : seconds }}
          onAnimationComplete={handleAnimationEnd}
          className="h-full w-full rounded-lg bg-[#745696]"
        />
      </div>
    </div>
  );
};

export default Countdown;
