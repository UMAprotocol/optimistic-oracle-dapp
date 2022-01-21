const calculateTimeRemaining = (
  currentTime: number,
  expirationTime: number
) => {
  let timeLeft = expirationTime - Number(currentTime);

  // format difference
  if (timeLeft < 0) timeLeft = 0;
  return timeLeft;
};

export default calculateTimeRemaining;
