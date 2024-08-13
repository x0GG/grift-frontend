import { useEffect, useState } from "react";

interface CountdownProps {
  targetTime: number;
}

const Countdown: React.FC<CountdownProps> = ({ targetTime }) => {
  const [countDown, setCountDown] = useState<number>(targetTime - new Date().getTime());

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    const difference = targetTime - new Date().getTime();
    if (difference >= 0) {
      interval = setInterval(() => {
        const remainingTime = targetTime - new Date().getTime();
        if (remainingTime >= 0) {
          setCountDown(remainingTime);
        } else {
          setCountDown(0);
          clearInterval(interval);
        }
      }, 1000);
    } else {
      setCountDown(0);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [targetTime]);

  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return (
    <>{countDown ? (hours ? `${hours}h ${minutes}m ${seconds}s` : `${minutes}m ${seconds}s`) : "00h 00m 00s"}</>
  );
};

export default Countdown;