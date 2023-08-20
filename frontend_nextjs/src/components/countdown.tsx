import { useEffect, useState } from 'react';

const Countdown = ({
  seconds,
  onCountdownComplete,
}: {
  seconds: number;
  onCountdownComplete: () => void;
}) => {
  const [resetKey, setResetKey] = useState(0); // Key to reset the animation
  const [animationDuration, setAnimationDuration] = useState(seconds);
  useEffect(() => {
    // Update animation duration and trigger reset
    setAnimationDuration(seconds);
    setResetKey((prevKey) => prevKey + 1);
  }, [seconds]);

  useEffect(() => {
    const animatedElement = document.querySelector('.progressing div');

    const handleAnimationEnd = () => {
      onCountdownComplete(); // Call the provided callback when animation completes
    };

    if (animatedElement) {
      animatedElement.addEventListener('animationend', handleAnimationEnd);

      return () => {
        animatedElement.removeEventListener('animationend', handleAnimationEnd);
      };
    }
    return () => {};
  }, [onCountdownComplete]);
  return (
    <div className="flex justify-center">
      <div className="progressing">
        <div key={resetKey} />
      </div>

      <style jsx>{`
        .progressing {
          width: calc(100vw - 15rem);
          height: 1em;
          border-radius: 8px;
          background-color: #393241;
        }

        .progressing div {
          height: 100%;
          width: 100%;
          border-radius: 8px;
          background-color: #745696;
          animation: width7435 ${animationDuration}s linear;
          transition: all;
        }

        @keyframes width7435 {
          from {
            /*width: 0;*/
            transform: scaleX(0);
          }

          to {
            transform: scaleX(1);
          }
        }
      `}</style>
    </div>
  );
};

export default Countdown;
