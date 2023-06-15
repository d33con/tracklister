export const convertDuration = (totalSeconds: number) => {
  if (totalSeconds < 360)
    return new Date(totalSeconds * 1000).toISOString().substring(15, 19);
  if (totalSeconds < 3600)
    return new Date(totalSeconds * 1000).toISOString().substring(14, 19);
  return new Date(totalSeconds * 1000).toISOString().substring(12, 19);
};

export const convertPlayerDuration = (totalSeconds: number) => {
  if (totalSeconds < 360)
    return new Date(totalSeconds * 1000).toISOString().substring(15, 19);
  if (totalSeconds < 3600)
    return new Date(totalSeconds * 1000).toISOString().substring(14, 19);
  return new Date(totalSeconds * 1000).toISOString().substring(12, 19);
};
