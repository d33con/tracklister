const bytesToMB = (bytes: number) => {
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(2)}MB`;
};

export default bytesToMB;
