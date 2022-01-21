import { useState, useEffect } from "react";
import { DateTime, Duration } from "luxon";

function useCountdownTimer(startTime: number, expirationTime: number) {
  const [currentTime, setCurrentTime] = useState(startTime.toString());
  useEffect(() => {
    setCurrentTime(calculateTimeRemaining(currentTime, expirationTime));
    const timer = setInterval(
      () => setCurrentTime(calculateTimeRemaining(currentTime, expirationTime)),
      1000
    );
    return () => clearInterval(timer);
  }, []);

  return currentTime;
}

const calculateTimeRemaining = (
  currentTime: string,
  expirationTime: number
) => {
  const timeLeft = DateTime.local(Number(currentTime)).minus(expirationTime);

  let text = "Expired";
  // format difference
  if (timeLeft.toSeconds() > 0)
    text = Duration.fromMillis(timeLeft.toMillis()).toFormat(
      "hh'h':mm'min' s'sec' left"
    );

  return text;
};

export default useCountdownTimer;
