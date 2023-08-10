import { useEffect, useState } from 'react';

interface CountdownProps {
  targetTime: number; // Target time in seconds
}

const Countdown: React.FC<CountdownProps> = ({ targetTime }) => {
  const initialTimeLeft = localStorage.getItem('countdownTimeLeft')
    ? parseInt(localStorage.getItem('countdownTimeLeft')!)
    : targetTime;
  const [timeLeft, setTimeLeft] = useState<number>(initialTimeLeft);

  useEffect(() => {
    localStorage.setItem('countdownTimeLeft', timeLeft.toString());

    const interval = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        clearInterval(interval);
      }
    }, 1000);
  }, [timeLeft]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div>
      <p>Time remaining: {formatTime(timeLeft)}</p>
    </div>
  );
};

export default Countdown;
