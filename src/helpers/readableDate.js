export const getReadableDate = (timestamp) =>
  new Date(timestamp * 1000).toLocaleString();
